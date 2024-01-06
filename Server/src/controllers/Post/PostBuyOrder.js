const nodemailer = require("nodemailer");
const { Order, Product, User } = require("../../db");
const fs = require("fs");
const path = require("path");
const { sendOrderConfirmationEmail } = require("../../email/mailer/mailer");

const PostBuyOrder = async (req, res) => {
  const { payment, cart, user } = req.body


  try {
    console.log(user);
    let {userId} = user

    let userFound = await User.findByPk(userId)
   
    if (!userFound) {
      console.log("User not found")
      return {message: "User not found"}//res.status(404).send({message: "User not found"})
      
    }

    const order = await Order.create({
      paypalId: payment.id,
      UserId: userFound.id,
      total: payment.value,
    });

    for (const { id, cantidad, price } of cart) {
      const product = await Product.findOne({ where: { id } });

      if (!product){
        console.log("Product with id " + id + " not found");
        return res.status(404).send({message: "Product not found"})
         
      }

      const subtotal = cantidad * parseFloat(price);

      product.stock -= cantidad;
      
      await product.save();

      await order.addProduct(product, { through: { subtotal, cantidad } });
      
    }

    sendOrderConfirmationEmail(order, user, cart);

    return {message:"Order added successfully"}//res.status(200).send({message:"Order added successfully"})
  } catch (error) {
    console.log("Failed to post buy order: " + error.message);
    console.log(error.stack)
    return res.status(500).json({ error: `Failed to post buy order., ${error.message}` });
  }
};

module.exports = { PostBuyOrder };
