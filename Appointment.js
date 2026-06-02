const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, "Patient name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[0-9]{11}$/, "Phone number must be 11 digits"],
    },

    medicalRecord: {
      type: String,
      default: "",
    },

    reason: {
      type: String,
      required: [true, "Reason is required"],
    },
    doctorName: {
  type: String,
  required: [true, "Doctor is required"]
},
    department: {
      type: String,
      required: [true, "Department is required"],
    },

    appointmentDate: {
      type: String,
      required: [true, "Appointment date is required"],
    },

    appointmentTime: {
      type: String,
      required: [true, "Appointment time is required"],
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);