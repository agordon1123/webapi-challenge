const express = require('express');
const projectRouter = require('./routers/projectRouter');

const server = express();

server.use('/projects', projectRouter);

module.exports = server;
