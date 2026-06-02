const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  gender: String,
  dob: String,
  specialization: String,
  experience: String,
  address: String

});

module.exports =
  mongoose.model("Profile", profileSchema);