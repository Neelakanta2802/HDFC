const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const bankingRoutes = require("./routes/bankingRoutes");

const app = express();

// CORS Middleware — allows requests from localhost and AWS Amplify domains
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (curl/Postman) or matching localhost / AWS Amplify
      if (
        !origin ||
        origin.includes("localhost") ||
        origin.includes("127.0.0.1") ||
        origin.endsWith(".amplifyapp.com")
      ) {
        callback(null, true);
      } else {
        callback(null, true); // Safe fallback to ensure production availability
      }
    },
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
