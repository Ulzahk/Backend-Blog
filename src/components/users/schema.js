const mongoose = require('mongoose')
const { Schema } = mongoose

const Users = new Schema({
  username: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  page: { type: String },
  twitter: { type: String },
  profile_picture: { type: String, required: true }
})

module.exports = mongoose.model('Users', Users)
