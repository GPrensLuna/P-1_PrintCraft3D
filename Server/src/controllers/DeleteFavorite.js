const { Favorite } = require('../db')

const DeleteFavorite = async (req, res) => {
  try {
    const { id } = req.params
    const fav = await Favorite.findByPk(id)
    console.log(fav)
    await fav.destroy()
    // res.status(200).json(aux);
    const favs = await Favorite.findAll()
    return res.status(200).json(favs)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = DeleteFavorite
