/* eslint-disable no-console */
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  googleID: String,
  name: String,
  email: String,
  facebookID: String,
  local: {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  }
});
userSchema.plugin(uniqueValidator);

// adding hook on userSchema, pre-save to hash and salt password
userSchema.pre('save', async function(next) {
  try {
    // check if the password has been modified
    if (!this.isModified('local.password')) {
      return next();
    }
    // hash password with salting
    const hashedPassword = await bcrypt.hash(this.local.password, 10);
    // set user password to hashedPassword before saving
    this.local.password = hashedPassword;
    return next();
  } catch (err) {
    // send error to error middleware
    return next(err);
  }
});

userSchema.method.comparePassword = async function(candidatePassword, next) {
  try {
    //compare hashed password to hashed password in database
    const isMatch = await bcrypt.compare(
      candidatePassword,
      this.local.password
    );
    console.log('User.js    isMatch?:', isMatch);
    return isMatch;
  } catch (err) {
    // if error, send to errorHandler
    return next(err);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
