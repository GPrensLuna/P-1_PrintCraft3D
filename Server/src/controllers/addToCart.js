const { ShoppingCart, Cart_Product } = require("../db");
const { Op } = require("sequelize");

const addToCart = async (req, res) => {
  try {
    const { userId, carrito, total } = req.body;
    console.log(userId, carrito, total);

    if (!userId || !total || carrito.length === 0)
      return res.status(401).json({ error: "Faltan Datos" });

    const cartUser = await ShoppingCart.findOne({
      where: { UserId: userId },
    });

    // cartUser.total = total;
    await ShoppingCart.update(
      { total: total },
      {
        where: {
          id: cartUser.id,
        },
      }
    );

    for (let item of carrito) {
      // console.log(parseFloat(item.price) * item.cantidad);
      var [newItem, created] = await Cart_Product.findOrCreate({
        where: {
          [Op.and]: [{ ShoppingCartId: cartUser.id }, { ProductId: item.id }],
        },
        defaults: {
          ShoppingCartId: cartUser.id,
          ProductId: item.id,
          cantidad: item.cantidad,
          subtotal: item.price * item.cantidad,
        },
      });
      if (!created) {
        await Cart_Product.update(
          {
            ShoppingCartId: cartUser.id,
            ProductId: item.id,
            cantidad: item.cantidad,
            subtotal: item.price * item.cantidad,
          },
          {
            where: {
              [Op.and]: [
                { ShoppingCartId: cartUser.id },
                { ProductId: item.id },
              ],
            },
          }
        );
      }
    }
    return res.status(200).json("Carrito Actualizado");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = addToCart;
