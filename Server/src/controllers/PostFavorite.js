const { Favorite, User, Product } = require("../db");
const { Op } = require("sequelize");

const PostFavorite = async (req, res) => {
  try {
    const { userID, productID } = req.body;
    if (!userID || !productID) {
      return res.status(401).json({ error: "Faltan datos" });
    }

    const user = await User.findByPk(userID);
    if (!user) {
      return res.status(400).json({ error: "No existe Usuario" });
    }
    const product = await Product.findByPk(productID);
    if (!product) {
      return res.status(400).json({ error: "No existe el Producto" });
    }

    // const newFav = await Favorite.create({
    //   UserId: user.id,
    //   ProductId: product.id,
    // });
    const [newFav, created] = await Favorite.findOrCreate({
      where: {
        [Op.and]: [{ UserId: user.id }, { ProductId: product.id }],
      },
      defaults: { UserId: user.id, ProductId: product.id },
    });

    // console.log(newFav);
    if (created) alert(`Ya existe el Producto Favorito para ${user.firsName}`);

    const favs = await Favorite.findAll();
    return res.status(200).json(favs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = PostFavorite;
