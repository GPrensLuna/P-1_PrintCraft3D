const jwt = require("jsonwebtoken");
const { SECRETKEY } = require("../../config.js");

const GetProfile = async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, SECRETKEY);

    res.status(200).json(decodedToken);
  } catch (error) {
    console.error("Error al descifrar el token:", error.message);
    res.status(401).json({ success: false, error: "Token inválido" });
  }
};

module.exports = {
  GetProfile,
};
