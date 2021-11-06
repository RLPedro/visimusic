const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  encryptedPassword: { type: String, required: true }
},
  { collection: 'users' }
)

const User = mongoose.model('user', userSchema);

module.exports = User;