const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");

// GET ALL CHATS
router.get("/", async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      chats,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error fetching chats",
    });
  }
});

// TEST ROUTE
router.get("/test", async (req, res) => {
  try {
    const chat = await Chat.create({
      userMessage: "Test Message",
      botReply: "Test Reply",
    });

    res.json(chat);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Test save failed",
    });
  }
});

// SAVE CHAT
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        reply: "Message cannot be empty",
      });
    }

    let reply = "";

    if (message.toLowerCase().includes("appointment")) {
      reply = "You can book an appointment from the Appointments page.";
    } else if (message.toLowerCase().includes("doctor")) {
      reply = "Our doctors are available 24/7 across all departments.";
    } else {
      reply =
        "Thanks for your message. A medical assistant will respond shortly.";
    }

    console.log("Incoming Message:", message);

    const savedChat = await Chat.create({
      userMessage: message,
      botReply: reply,
    });

    console.log("Chat Saved:", savedChat._id);

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("CHAT ERROR:", error);

    res.status(500).json({
      success: false,
      reply: "Server error",
    });
  }
});

module.exports = router;