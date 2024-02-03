const { Order, Order_Product, User } = require("../../db");

const GetOrder = async (req, res) => {
  try {
    let { userEmail } = req.params; // Cambiamos idUser por userEmail

    // Buscar al usuario por su email para obtener el ID
    const user = await User.findOne({ where: { email: userEmail } });
    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }
    const idUser = user.id;

    // Obtener las órdenes del usuario usando el ID obtenido
    let { count, rows } = await Order.findAndCountAll({
      where: { UserId: idUser },
    });

    let ordersWithProducts = []; // Array para almacenar las órdenes con productos

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
      .send("Hubo un error obteniendo las órdenes de compra: " + error.message);
  }
};

module.exports = { GetOrder };
