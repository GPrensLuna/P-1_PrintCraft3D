const { User } = require('../../db')

const DeleteUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const user = await User.findByPk(idUser);

    if (!user || user.deleted) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    user.deleted = true;
    await user.save();

    const users = await User.findAll({
      where: { deleted: false }, 
    });

    return res.status(200).json({
      
      message: 'Usuario eliminado',
      users
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  DeleteUser
}
