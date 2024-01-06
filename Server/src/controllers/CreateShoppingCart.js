const { ShoppingCart, User } = require("../db");

const CreateShoppingCart = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId)
      return res.status(401).json({ error: "Falta el ID del Usuario" });
    const user = await User.findByPk(userId);
    if (user) {
      const [newCart, created] = await ShoppingCart.findOrCreate({
        where: { UserId: userId },
        defaults: {
          UserId: userId,
          total: 0,
        },
      });
      return res.status(200).json(newCart);
    } else {
      return res.status(401).json({ error: "No existe el Usuario en la BD" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = CreateShoppingCart;
