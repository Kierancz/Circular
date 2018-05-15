const express = require('express');
const localRouter = express.Router();
const { register } = require('../middlewares/auth');

localRouter.post('/auth/local/register', register);

module.exports = localRouter;
