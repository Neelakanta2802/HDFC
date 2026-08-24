const mockData = require("../data/mockData");

// GET /api/accounts
exports.getAccounts = async (req, res) => {
  try {
    res.json({
      success: true,
      data: mockData.accounts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/cards
exports.getCards = async (req, res) => {
  try {
    res.json({
      success: true,
      data: mockData.cards,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/billsrecharge
exports.getBills = async (req, res) => {
  try {
    res.json({
      success: true,
      data: mockData.bills,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/loans
exports.getLoans = async (req, res) => {
  try {
    res.json({
      success: true,
      data: mockData.loans,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/insurance
exports.getInsurance = async (req, res) => {
  try {
    res.json({
      success: true,
      data: mockData.insurance,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
