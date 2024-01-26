const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../db.js");
const { sendWelcomeEmail } = require("../../email/mailer/mailer.js");
const { SECRETKEY } = require("../../config.js");
const { serialize } = require("cookie"); // Importa la función serialize

async function PostRegisterGoogle(req, res) {
  try {
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      const token = jwt.sign(
        {
          userId: existingUser.id,
          email: existingUser.email,
          name: existingUser.firstName,
          roll: existingUser.roll,
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
      res.status(200).json({ token, message: "Inicio de sesión exitoso" });
    } else {
      // Crear un nuevo usuario
      const newUser = await User.create({
        firstName: req.body.firstName,
        email: req.body.email,
        roll: req.body.roll || "Client",
      });

      const token = jwt.sign(
        {
          userId: newUser.id,
          email: newUser.email,
          name: newUser.firstName,
          roll: newUser.roll,
        },
        SECRETKEY,
        { expiresIn: "1h" }
      );

      const cookieOptions = {
        httpOnly: true,
        maxAge: 3600000,
      };

      let { id } = newUser;
      const tokenCookie = serialize("token", token, cookieOptions);

      res.setHeader("Set-Cookie", tokenCookie);
      res
        .status(201)
        .json({ token, message: "Usuario registrado exitosamente", id });

      sendWelcomeEmail(newUser);
    }
  } catch (error) {
    console.error("Error en el registro:", error);

    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ error: "Error de validación en la creación del usuario" });
    }

    res.status(500).json({ message: "Error en el servidor" });
  }
}

module.exports = {
  PostRegisterGoogle,
};
