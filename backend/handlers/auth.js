/* eslint-disable no-console */
const db = require('../models');
const jwt = require('jsonwebtoken');

// NEW USER REGISTRATION FUNCTION
exports.register = async function(req, res, next) {
  try {
    // check dups on user email
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

// USER SIGNIN FUNCTION
exports.signin = async function(req, res, next) {
  try {
    // find a user
    const user = await db.User.findOne({
      ['local.email']: req.body['local.email']
    });
    const { _id, local: { email } } = user;
    // does the passwork work
    const isMatch = await user.comparePassword(req.body['local.password']);
    console.log('isMatch ', isMatch);
    if (isMatch) {
      // if match build token
      const token = jwt.sign(
        {
          _id,
          email
        },
        // sign with secret key
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        _id,
        email,
        token
      });
    } else {
      // if password doesn't match
      return next({
        status: 400,
        message: 'Invalid email/password combination'
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: 'Invalid email/password combination'
    });
  }
};
