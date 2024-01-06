const { Order_Product } = require("../../db");

const GetOrderProducts = async (req, res) => {
    try {       
        let {idOrder} = req.params
        let orderProducts = await Order_Product.findAll({where: {OrderId: idOrder}})
        res.status(200).json(orderProducts)
    } catch (error) {
        console.log(error.message);
        console.log(error.stack);
        res.status(500).json(error = error.message)
    }
}

module.exports = {GetOrderProducts}