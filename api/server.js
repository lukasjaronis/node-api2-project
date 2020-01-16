const express = require("express");
const helmet = require('helmet');
const postsRouter = require("../Post/post-router");
const server = express();
server.use(helmet());
server.use(express.json());
server.use('/api/posts', postsRouter);
module.exports = server;