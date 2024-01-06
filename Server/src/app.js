const express = require('express')
const routes = require('./routes')

const configureMiddleware = require("./middlewares/auth.middleware.js");
const errorMiddleware = require("./middlewares/error.middleware.js");

const server = express()
server.name = 'SERVER'

server.use(express.static("client"));
configureMiddleware(server)

server.use(express.json());

server.use("/PrintCraft3D", routes);
server.use(errorMiddleware);

module.exports = server;
