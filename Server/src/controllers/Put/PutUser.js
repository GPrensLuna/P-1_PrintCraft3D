const { User } = require("../../db.js");

async function PutUser(req, res) {
  const userId = req.params.id;
  const userData = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ mensaje: "El usuario no se encontró." });
    }

    if (!userData.firstName || !userData.email) {
      return res
        .status(400)
        .json({ mensaje: "Datos incompletos o inválidos." });
    }

    await user.update(userData);

    return res
      .status(200)
      .json({
       mensaje: "Usuario actualizado exitosamente.",
       usuario: user
       });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ mensaje: "Hubo un error al actualizar el usuario." });
  }
}

module.exports = {
  PutUser,
};
