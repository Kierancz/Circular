/* eslint-disable no-console */
const db = require('../models');
const jwt = require('jsonwebtoken');

exports.register = async function(req, res, next) {
  try {
    // const userEmail = Object.values(req.body)[0];
    // const checkForExistingEmail = await db.User.findOne({ 'local.email': userEmail });

    // check dups on useremail
    //create a user
    const user = await db.User.create(req.body, function(err) {
      if (err) {
        return next(err.errors['local.email'].kind);
      }
    });
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
