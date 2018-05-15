const db = require('../models');
const jwt = require('jsonwebtoken');

exports.register = async function(req, res, next) {
  try {
    //create a user
    const user = await db.User.create(req.body);
    // destructure req.body
    const { id, email } = user.local;
    //create a token (sign the token)
    const token = jwt.sign(
      {
        id,
        email
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      email,
      token
    });
  } catch (err) {
    // see what kind of error
    // if validation error \/
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
