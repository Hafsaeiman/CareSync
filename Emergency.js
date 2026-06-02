const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema({

  patient: String,
  room: String,
  type: String,
  critical: Boolean,
  time: String

});

module.exports =
  mongoose.model("Emergency", emergencySchema);