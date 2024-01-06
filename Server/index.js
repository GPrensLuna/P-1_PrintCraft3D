const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT, LOCALHOST } = require("./src/config.js");

const startServer = async () => {
  try {
    await conn.sync({ alter: true });
    server.listen(PORT, LOCALHOST, () => {
      console.log(`Server is listening at port ${PORT} : `);

      console.log(`http://${LOCALHOST}:${PORT}`);

      console.log("https://printcraft3d.up.railway.app");
    });
  } catch (error) {
    console.error(" Error starting the server:", error);
  }
};

startServer();
