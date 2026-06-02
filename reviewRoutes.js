const express = require("express");

const router = express.Router();

const Review =
  require("../models/Review");

/* ADD REVIEW */

router.post("/", async (req, res) => {

  try {

    const review =
      new Review(req.body);

    await review.save();

    res.json({
      success: true,
      message:
        "Review Added Successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});

/* GET REVIEWS */

router.get("/", async (req, res) => {

  try {

    const reviews =
      await Review.find()
      .sort({ createdAt: -1 });

    res.json(reviews);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});

module.exports = router;