const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Public authentication routes
router.post("/login", authController.login);
router.post("/signup", authController.signup);

// Protected user profile route
router.get("/api/user-profile", authMiddleware, authController.getProfile);

module.exports = router;
