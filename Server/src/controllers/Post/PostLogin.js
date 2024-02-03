const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../db.js");
const { serialize } = require("cookie");
const { SECRETKEY } = require("../../config.js");

const PostLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      if (user.deleted) {
        console.error("Cuenta bloqueada");
        return res.status(403).json({ error: "Cuenta bloqueada" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign(
          {
            userId: user.id,
            email: user.email,
            name: user.firstName,
            roll: user.roll,
            image: user.image,
          },
          SECRETKEY,
          { expiresIn: "1h" }
        );

        const cookieOptions = {
          httpOnly: true,
          maxAge: 3600000,
        };
        const tokenCookie = serialize("token", token, cookieOptions);

        res.setHeader("Set-Cookie", tokenCookie);

        res.status(200).json({
          message: "Inicio de sesión exitoso",
          token,
          id: user.id,
          image: user.image,
          email: user.email,
          name: user.firstName,
          roll: user.roll,
        });
      } else {
        console.error("Contraseña incorrecta");
        res.status(401).json({ error: "Contraseña incorrecta" });
      }
    } else {
      console.error("Usuario no encontrado");
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  PostLogin,
};
