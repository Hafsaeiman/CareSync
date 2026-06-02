const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
// const chatRoutes = require("./routes/chat");
const connectDB = require("./config/db");
const { notFound } = require("./middleware/notFoundMiddleware");
const { errorHandler } = require("./middleware/errorMiddleware");
dotenv.config();

// connect MongoDB
connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("CareSync API Running");
});

/* ROUTES */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/emergency", require("./routes/emergencyRoutes"));
app.use("/api/lab", require("./routes/labRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
/* ERROR HANDLING */
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});