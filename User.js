const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  firstName: String,
  lastName: String,

  email: {
    type: String,
    unique: true
  },

  phone: String,
  role: String,
  password: String

});

module.exports =
  mongoose.model("User", userSchema);