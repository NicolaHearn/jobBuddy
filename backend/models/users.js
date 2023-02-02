const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { Schema, model } = mongoose;


const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  myApplications: []
});


userSchema.statics.signup = async function(firstname, lastname, email, password) {
  console.log("Signing up");
  // validation
  if (!email || !password || !firstname || !lastname) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  const user = await this.create({ firstname, lastname, email, password: hash})
  return user
}

userSchema.statics.signin = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }
  return user
}

module.exports = mongoose.model('User', userSchema)

// create a user route
// create a controller method to get all users