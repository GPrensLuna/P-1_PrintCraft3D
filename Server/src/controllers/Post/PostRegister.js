const bcrypt = require("bcrypt");
const { User } = require("../../db");
const { sendWelcomeEmail } = require("../../email/mailer/mailer");

async function PostRegister(req, res) {
  try {
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: hashedPassword,
      roll: req.body.roll,
    });

    sendWelcomeEmail(newUser);

    res
      .status(201)
      .json({ message: "Usuario registrado exitosamente", ID: newUser.id });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  PostRegister,
};
