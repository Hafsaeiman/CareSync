const express = require("express");

const router = express.Router();

const Appointment =
  require("../models/Appointment");

/* CREATE APPOINTMENT */

router.post("/", async (req, res) => {

  try {

    const appointment =
      new Appointment(req.body);

    await appointment.save();

    res.json({
      success: true,
      message:
        "Appointment Booked Successfully",
      appointment
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});

/* GET ALL APPOINTMENTS */

router.get("/", async (req, res) => {

  try {

    const appointments =
      await Appointment.find()
      .sort({ createdAt: -1 });

    res.json(appointments);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});

/* DELETE APPOINTMENT */

router.delete("/:id", async (req, res) => {

  try {

    await Appointment.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message:
        "Appointment Deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});

module.exports = router;