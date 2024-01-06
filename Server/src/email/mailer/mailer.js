const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const { GetOrder } = require("../../controllers/Get/GetOrder");
const handlebars = require("handlebars");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  // aca deberíamos crear variables de entorno en Railway
  auth: {
    user: "printcraft3dd@gmail.com",
    pass: "prsu tnat vqti gkgg",
    // ===================================
  },
});

function sendWelcomeEmail(newUser) {
  const emailTemplatePath = path.resolve(__dirname, "../welcome.hbs");
  const emailHTML = fs.readFileSync(emailTemplatePath, "utf8");
  const emailContent = emailHTML.replace(
    "{{userFirstName}}",
    newUser.firstName
  );

  transporter.sendMail({
    from: '"PrintCraft3d" <printcraft3dd@gmail.com>',
    to: newUser.email,
    subject: "Registro en PrintCraft3d",
    text: `Bienvenido ${newUser.firstName}!!, desde PrintCraft3d te agradecemos tu confianza`,
    html: emailContent,
  });
}

function sendOrderConfirmationEmail(order, user, cart) {
  const emailTemplatePath = path.resolve(__dirname, "../orders.hbs");
  const emailHTML = fs.readFileSync(emailTemplatePath, "utf8");
  const emailContent = {
    orderId: order.id,
    Name: user.firstName,
    total: order.total,
    products: cart,
  };

  handlebars.registerHelper("multiply", function (a, b) {
    return a * b;
  });

  const renderedContent = handlebars.compile(emailHTML)(emailContent);

  transporter.sendMail({
    from: '"PrintCraft3d" <printcraft3dd@gmail.com>',
    to: user.email,
    subject: "Confirmación de compra en PrintCraft3d",
    html: renderedContent,
  });
}

module.exports = {
  sendWelcomeEmail,
  sendOrderConfirmationEmail,
};
