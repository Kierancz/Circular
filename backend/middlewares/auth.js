/* eslint-disable no-console */
const db = require('../models');
const jwt = require('jsonwebtoken');

exports.register = async function(req, res, next) {
  try {
    //create a user
    const user = await db.User.create(req.body);
    // destructure req.body
    const { _id, local: { email } } = user;
    console.log('User.js: ID: ', _id, '   email: ', email);
    //create a token (sign the token)
    const token = jwt.sign(
      {
        _id,
        email
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      _id,
      email,
      token
    });
  } catch (err) {
    // if validation error
    if (err.code === 11000) {
      // if occupied email send error
      err.message = 'Sorry, that email is taken';
    }
    // otherwise, generic error
    return next({
      status: 400,
      message: err.message
    });
  }
};

exports.signin = () => {};
