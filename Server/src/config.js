const PORT = process.env.PORT;
const LOCALHOST = process.env.LOCALHOST;


const SECRETKEY= process.env.SECRETKEY;
const URL_FONT = process.env.URL_FONT;
const NODE_ENV = process.env.NODE_ENV ;
const clientID =process.env.clientID;
const DB_URL = process.env.DB_URL;
const ENVIRONMENT = process.env.ENVIRONMENT;
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

module.exports = {
  SECRETKEY,
  NODE_ENV,
URL_FONT,
  PORT,
  LOCALHOST,
  DB_URL,
  ENVIRONMENT,
  PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET,
  clientID,
};