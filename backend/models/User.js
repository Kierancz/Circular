const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  googleID: String,
  name: String,
  email: String,
  facebookID: String,
  local: {
    email: {
      type: String,
      required: true,
      uniqure: true
    },
    password: {
      type: String,
      required: true
    }
  }
});
// adding hook on userSchema, pre-save to hash and salt password
userSchema.pre('save', async next => {
  try {
    // check if the passwork has been modified
    if (!this.isModified('password')) {
      return next();
    }
    // hash password with salting
    const hashedPassword = await bcrypt.hash(this.password, 10);
    // set user password to hashedPassword before saving
    this.password = hashedPassword;
    return next();
  } catch (err) {
    // send error to error middleware
    return next();
  }
});

userSchema.method.comparePassword = async (candidatePassword, next) => {
  try {
    //compare hashed password to hashed password in database
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    // if error, sent to middleware
    return next(err);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
