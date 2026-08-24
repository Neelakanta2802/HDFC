const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const bankingRoutes = require("./routes/bankingRoutes");

const app = express();

// Body Parser Middleware
app.use(express.json());

// CORS Configuration — allows local dev and configurable production client URL
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, postman) or matching allowed origins
      if (!origin || allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== "production") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

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
