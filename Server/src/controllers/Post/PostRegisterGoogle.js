const jwt = require("jsonwebtoken");
const { User } = require("../../db.js");
const { sendWelcomeEmail } = require("../../email/mailer/mailer.js");
const { SECRETKEY } = require("../../config.js");
const { serialize } = require("cookie");

async function PostRegisterGoogle(req, res) {
  try {
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      if (existingUser.deleted) {
        console.error("Cuenta bloqueada");
        return res.status(403).json({ error: "Cuenta bloqueada" });
      }

      const token = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.firstName,
          roll: existingUser.roll,
          image: existingUser.image,
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

      return res.status(200).json({
        message: "Inicio de sesión exitoso",
        token,
        id: existingUser.id,
        roll: existingUser.roll,
        name: existingUser.firstName,
        image: existingUser.image,
        email: existingUser.email,
      });
    } else {
      const newUser = await User.create({
        firstName: req.body.firstName,
        email: req.body.email,
        roll: req.body.roll || "Client",
        image: req.body.image,
      });

      const token = jwt.sign(
        {
          userId: newUser.id,
          email: newUser.email,
          name: newUser.firstName,
          roll: newUser.roll,
          image: newUser.image,
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
      res.status(201).json({
        token,
        message: "Usuario registrado exitosamente",
        id: newUser.id,
        roll: newUser.roll,
        name: newUser.firstName,
        image: newUser.image,
        email: newUser.email,
      });

      try {
        await sendWelcomeEmail(newUser);
        console.log("Correo de bienvenida enviado a:", newUser.email);
      } catch (error) {
        console.error("Error al enviar el correo de bienvenida:", error);
      }
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
