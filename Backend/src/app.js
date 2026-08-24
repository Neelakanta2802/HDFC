const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const bankingRoutes = require("./routes/bankingRoutes");

const app = express();

// CORS Middleware — allows frontend on localhost:5173 to make requests
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body Parser Middleware — parse incoming JSON requests
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MERN Banking Portal API is running",
  });
});

// Route Modules
app.use(authRoutes);
app.use(transactionRoutes);
app.use(bankingRoutes);

module.exports = app;
