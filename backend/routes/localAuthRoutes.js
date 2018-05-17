const express = require('express');
const localRouter = express.Router();
const { signin, register } = require('../middlewares/auth');

localRouter.post('/register', register);
localRouter.post('/signin', signin);

module.exports = localRouter;
