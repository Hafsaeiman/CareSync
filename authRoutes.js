const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

const User = require("../models/User");

/* SIGNUP */

router.post("/signup", async (req, res) => {

  try {

    const {
      firstName,
      lastName,
      email,
      phone,
      role,
      password
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.json({
        message: "User already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = new User({

      firstName,
      lastName,
      email,
      phone,
      role,
      password: hashedPassword

    });

    await user.save();

    res.json({
      message: "Signup Successful"
    });

  } catch (error) {

    res.status(500).json(error);

  }
});

/* LOGIN */

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.json({
        message: "User not found"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.json({
        message: "Invalid Password"
      });
    }

    res.json({
      message: "Login Successful",

      user: {
        name:
          user.firstName + " " +
          user.lastName,

        email: user.email
      }
    });

  } catch (error) {

    res.status(500).json(error);

  }
});

module.exports = router;