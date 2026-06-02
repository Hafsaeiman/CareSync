const express = require("express");

const router = express.Router();

const Emergency =
  require("../models/Emergency");

router.post("/", async (req, res) => {

  try {

    const emergency =
      new Emergency(req.body);

    await emergency.save();

    res.json({
      message:
        "Emergency Alert Sent"
    });

  } catch (error) {

    res.status(500).json(error);

  }
});

router.get("/", async (req, res) => {

  const alerts =
    await Emergency.find();

  res.json(alerts);
});

module.exports = router;