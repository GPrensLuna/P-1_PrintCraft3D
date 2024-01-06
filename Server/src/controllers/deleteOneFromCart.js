const { ShoppingCart, Cart_Product, Product } = require("../db");
const { Op } = require("sequelize");

const deleteOneFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    console.log(userId);
    console.log(productId);
    if (!userId || !productId)
      return res.status(401).json({ error: "Faltan Datos" });

    const cartUser = await ShoppingCart.findOne({
      where: { UserId: userId },
    });

    const product = await Product.findByPk(productId);
    //var newStock = product.stock + 1;
    var total = parseFloat(cartUser.total) - parseFloat(product.price);

    /*await Product.update(
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

    const cart_prod = await Cart_Product.findOne({
      where: {
        [Op.and]: [{ ShoppingCartId: cartUser.id }, { ProductId: productId }],
      },
    });

    var cant = parseInt(cart_prod.cantidad) - 1;
    var subt = parseFloat(cart_prod.subtotal) - parseFloat(product.price);

    if (cant > 0) {
      await Cart_Product.update(
        {
          ShoppingCartId: cartUser.id,
          ProductId: productId,
          cantidad: cant,
          subtotal: subt,
        },
        {
          where: {
            [Op.and]: [
              { ShoppingCartId: cartUser.id },
              { ProductId: productId },
            ],
          },
        }
      );
    } else {
      await Cart_Product.destroy({
        where: {
          [Op.and]: [{ ShoppingCartId: cartUser.id }, { ProductId: productId }],
        },
      });
    }

    return res.status(200).json("Item Eliminado");
  } catch (error) {
    console.log(error.message)
    console.log(error.stack);
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteOneFromCart;