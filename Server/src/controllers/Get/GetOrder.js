const { Order,  Order_Product } = require("../../db");

const GetOrder = async (req, res) => {
  try {
    let { idUser } = req.params;

    // Obtener las órdenes del usuario
    let { count, rows } = await Order.findAndCountAll({
      where: { UserId: idUser },
    });

    // Array para almacenar las órdenes con productos
    let ordersWithProducts = [];

    // Iterar a través de cada orden y obtener los ProductIds asociados
    for (let i = 0; i < rows.length; i++) {
      let order = rows[i];

      // Obtener ProductIds asociados a la orden actual
      let orderProductIds = await Order_Product.findAll({
        attributes: ["ProductId"],
        where: { OrderId: order.id },
      });

      // Mapear los resultados para obtener un array de ProductId
      let productIds = orderProductIds.map(
        (orderProduct) => orderProduct.ProductId
      );

      // Agregar la orden con los ProductIds al array
      ordersWithProducts.push({
        order: order,
        productIds: productIds,
      });
    }

    res
      .status(200)
      .send({ count: count, ordersWithProducts: ordersWithProducts });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .send("Hubo un error obteniendo las ordenes de compra: " + error.message);
  }
};

module.exports = { GetOrder };

// const { Order } = require("../../db");

// const GetOrder = async (req, res) => {
//     try {
//         let {idUser} = req.params

//         let {count, rows} = await Order.findAndCountAll({where: {UserId: idUser}})

//         res.status(200).send({count: count, orders: rows});
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send('Hubo un error obteniendo las ordenes de compra: ' + error.message)
//     }
// }

// module.exports = {GetOrder}
