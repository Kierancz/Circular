require('dotenv').load();
const jwt = require('jsonwebtoken');

// ********
// jwt doesn't yet support async so using callbacks
// ********

// make sure use is logged in - Authentication
exports.loginRequired = function(req, res, next) {
  try {
    console.log('req.body ', req.query);
    const token = req.headers.authorization.spilt(' ')[1]; // Bearer_[token]
    jwt.verify(token, process.env.SECRET_KEY, function(err, decodedPayload) {
      if (decodedPayload) {
        return next();
      } else {
        return next({
          status: 401,
          message: 'Please log in first'
        });
      }
    });
  } catch (err) {
    return next({
      status: 401,
      message: 'Please log in first'
    });
  }
};

// /api/comments/:id
// verify this http

// make sure we get the correct user - Authorization
// needs to have signed the campaign for which they are commenting
exports.ensureCorrectUser = function(req, res, next) {
  try {
    // does the commenters ID exist in the array of signatures on the campaign
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decodedPayload) {
      // check if decodedPayload matches the id in the http post
      if (decodedPayload && decodedPayload.id === req.params.id) {
        return next();
      } else {
        return next({
          status: 401,
          massage: 'You are not authorized for this action'
        });
      }
    });
  } catch (err) {
    return next({
      status: 401,
      message: 'Please log in first'
    });
  }
};
