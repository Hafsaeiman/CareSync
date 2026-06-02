const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({
  index: Number,
  timestamp: String,
  data: Object,
  previousHash: String,
  hash: String
});

const testSchema = new mongoose.Schema({
  testName: String,
  result: String,
  reference: String,
  status: String,
  charges: Number
});

const labReportSchema = new mongoose.Schema({

  patientId: String,
  patientName: String,
  reportId: String,
  department: String,
  doctor: String,

  tests: [testSchema],

  totalCharges: Number,
  diagnosis: String,

  blockchain: [blockSchema]

});

module.exports = mongoose.model(
  "LabReport",
  labReportSchema
);