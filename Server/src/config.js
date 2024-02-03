const PORT = process.env.PORT;
const LOCALHOST = process.env.LOCALHOST;
const URL_FONT = process.env.URL_FONT;
const SECRETKEY = process.env.SECRETKEY;
const NODE_ENV = process.env.NODE_ENV | true;
const DB_URL = process.env.DB_URL;
const ENVIRONMENT = process.env.ENVIRONMENT;
const NEXT_PUBLIC_PAYPAL = process.env.NEXT_PUBLIC_PAYPAL;
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

module.exports = {
  PORT,
  LOCALHOST,
  URL_FONT,
  SECRETKEY,
  NODE_ENV,
  DB_URL,
  ENVIRONMENT,
  NEXT_PUBLIC_PAYPAL,
  PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET,
};
