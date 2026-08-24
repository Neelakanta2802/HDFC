const express = require("express");
const router = express.Router();
const bankingController = require("../controllers/bankingController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected banking modules (accounts, cards, bills, loans, insurance)
router.get("/api/accounts", authMiddleware, bankingController.getAccounts);
router.get("/api/cards", authMiddleware, bankingController.getCards);
router.get("/api/billsrecharge", authMiddleware, bankingController.getBills);
router.get("/api/loans", authMiddleware, bankingController.getLoans);
router.get("/api/insurance", authMiddleware, bankingController.getInsurance);

module.exports = router;
