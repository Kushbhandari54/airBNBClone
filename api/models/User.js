const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
