const express = require('express');
const localRouter = express.Router();
const { signin, register } = require('../handlers/auth');

localRouter.post('/register', register);
localRouter.post('/signin', signin);

module.exports = localRouter;
