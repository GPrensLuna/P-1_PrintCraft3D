// authController.js

const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const { clientID, SECRETKEY } = require('../../config.js');

const client = new OAuth2Client(clientID);

const PostLoginGoogle = async (req, res) => {
  const { idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: clientID,
    });

    const payload = ticket.getPayload();

    const userToken = jwt.sign({ userId: payload.sub }, SECRETKEY, {
      expiresIn: '1h',
    });

    res.json({ token: userToken });
  } catch (error) {
    console.error('Error al verificar el token de Google:', error);
    res.status(401).json({ error: 'Error de autenticación' });
  }
};

module.exports = {
  PostLoginGoogle,
};
