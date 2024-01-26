// authController.js

const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const { clientID, SECRETKEY } = require("../../config.js");

const client = new OAuth2Client(clientID);

const PostLoginGoogle = async (req, res) => {
  const { idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: clientID,
    });

    const payload = ticket.getPayload();

    // Buscar o crear el usuario en la base de datos
    let user = await User.findOrCreate({
      where: { googleId: payload.sub },
      defaults: {
        email: payload.email,
        name: payload.name,
        // otros campos necesarios
      },
    });

    // Si `findOrCreate` retorna un array, obtén el usuario del primer elemento
    user = Array.isArray(user) ? user[0] : user;

    const userToken = jwt.sign({ userId: user.id }, SECRETKEY, {
      expiresIn: "1h",
    });

    res.json({
      token: userToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error al verificar el token de Google:", error);
    res.status(401).json({ error: "Error de autenticación" });
  }
};

module.exports = {
  PostLoginGoogle,
};
