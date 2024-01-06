//const PORT = process.env.PORT;
//const LOCALHOST = process.env.LOCALHOST;

  const PORT = 3001;
const LOCALHOST = "localhost"; 

const URL_FONT = "https://printcraft3d.vercel.app/";
const SECRETKEY = "printcraft3d";

const NODE_ENV = process.env.NODE_ENV || true;

const clientID =
  "1009242410508-qrbh4egjfjknhavfckvhock1o0trgt82.apps.googleusercontent.com";

const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "admin";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_NAME = process.env.DB_NAME || "printcraft-3d";
const DB_PORT = process.env.DB_PORT || 5432;
const DB_URL = process.env.DB_URL;

//const DB_URL = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
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