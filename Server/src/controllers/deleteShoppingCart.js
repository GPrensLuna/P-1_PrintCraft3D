const { ShoppingCart, Cart_Product } = require("../db");
const { Op } = require("sequelize");

const deleteShoppingCart = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId)
      // return res.status(401).json({ error: "Falta el ID del Usuario" });
      return { error: "Falta el ID del Usuario" };

    const cartUser = await ShoppingCart.findOne({
      where: { UserId: userId },
    });

    await ShoppingCart.update(
      { total: 0 },
      {
        where: {
          id: cartUser.id,
        },
      }
    );

    await Cart_Product.destroy({
      where: {
        ShoppingCartId: cartUser.id,
      },
    });

    // return res.status(200).json("Carrito Eliminado");
    return { message: "Carrito Eliminado" };
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteShoppingCart;
