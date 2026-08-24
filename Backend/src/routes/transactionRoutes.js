const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const authMiddleware = require("../middleware/authMiddleware");

// All transaction routes are protected by JWT authentication middleware
router.get("/api/transactions", authMiddleware, transactionController.getTransactions);
router.post("/api/transactions", authMiddleware, transactionController.createTransaction);

module.exports = router;
