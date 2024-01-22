const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT, LOCALHOST, URL_FONT } = require("./src/config.js");

const startServer = async () => {
  try {
    await conn.sync({ alter: false });
    server.listen(PORT, LOCALHOST, () => {
      console.log(`Server is listening at port ${PORT} : `);

      console.log(`http://${LOCALHOST}:${PORT}`);

      console.log(`${URL_FONT}`);
    });
  } catch (error) {
    console.error(" Error starting the server:", error);
  }
};

startServer();
