const { ShoppingCart, Cart_Product, Product } = require("../db");
const { Op } = require("sequelize");

const deleteItemsFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId)
      return res.status(401).json({ error: "Faltan Datos" });

    const cartUser = await ShoppingCart.findOne({
      where: { UserId: userId },
    });

    const cart_prod = await Cart_Product.findOne({
      where: {
        [Op.and]: [{ ShoppingCartId: cartUser.id }, { ProductId: productId }],
      },
    });
    var total = parseFloat(cartUser.total) - parseFloat(cart_prod.subtotal);

    const product = await Product.findByPk(productId);
    /*var newStock = product.stock + cart_prod.cantidad;

    await Product.update(
      { stock: newStock },
      {
        where: {
          id: product.id,
        },
      }
    );*/

    await ShoppingCart.update(
      { total: total },
      {
        where: {
          id: cartUser.id,
        },
      }
    );

    await Cart_Product.destroy({
      where: {
        [Op.and]: [{ ShoppingCartId: cartUser.id }, { ProductId: productId }],
      },
    });

    return res.status(200).json("Items Eliminados");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deleteItemsFromCart;