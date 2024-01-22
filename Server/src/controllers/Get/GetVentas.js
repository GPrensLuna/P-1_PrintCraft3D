const { Order, Product } = require("../../db");

const GetVentas = async (req, res) => {
    try {
      let orders = await Order.findAll({
        include: { model: Product },
      });
  
      res.status(200).json({
        orders,
      });
    } catch (error) {
      console.log(error.message);
      console.log(error.stack);
      res.status(500).send(error.message);
    }
  };

module.exports = {GetVentas}