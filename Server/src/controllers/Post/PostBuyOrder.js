const nodemailer = require("nodemailer");
const { Order, Product, User } = require("../../db");
const fs = require("fs");
const path = require("path");
const { sendOrderConfirmationEmail } = require("../../email/mailer/mailer");

const PostBuyOrder = async (req, res) => {
  const { payment, cart, user } = req.body;

  try {
    const userEmail = user.email;

    let userFound = await User.findOne({
      where: { email: userEmail },
      attributes: ["id"],
    });

    if (!userFound) {
      return { message: "User not found" };
    }

    const order = await Order.create({
      cart: cart,
      paypalId: payment.id,
      UserId: userFound.id,
      total: payment.value,
    });

    for (const { id, count, price } of cart) {
      const product = await Product.findOne({ where: { id } });

      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }

      const subtotal = count * parseFloat(price);

      product.stock -= count;

      await product.save();

      await order.addProduct(product, { through: { subtotal, count } });
    }

    sendOrderConfirmationEmail(order, user, cart);

    return { message: "Order added successfully" };
  } catch (error) {
    console.error(error.stack);
    return res
      .status(500)
      .json({ error: `Failed to post buy order., ${error.message}` });
  }
};

module.exports = { PostBuyOrder };
