const express = require('express');

const postRouter = require('./Post/post-router');
const commentRouter = require('./Comments/comment-router');

const server = express();

server.use(express.json()); // this is enabling us to use json

server.use('/api/posts', postRouter);
server.use('/api/comments', commentRouter);