const express = require("express");
const router = express.Router();

const Profile = require("../models/Profile");

// CREATE PROFILE
router.post("/", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      dob,
      specialization,
      experience,
      address
    } = req.body;

    const profile = new Profile({
      firstName,
      lastName,
      email,
      phone,
      gender,
      dob,
      specialization,
      experience,
      address
    });

    await profile.save();

    res.status(201).json({
      message: "Profile Saved Successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;