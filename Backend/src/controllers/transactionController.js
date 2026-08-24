const Transaction = require("../models/Transaction");

// GET /api/transactions — Fetch transactions for the authenticated user from MongoDB
exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user.userID;

    // Find transactions for this user from MongoDB
    let transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });

    // If none exist yet, seed initial demo transactions for a realistic experience
    if (transactions.length === 0) {
      transactions = await Transaction.insertMany([
        {
          userId,
          title: "Online Shopping Payment",
          category: "Shopping",
          amount: 2499,
          type: "debit",
          date: new Date(Date.now() - 86400000).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          referenceNo: "TXN" + Math.floor(100000 + Math.random() * 900000),
          status: "Success",
        },
        {
          userId,
          title: "Monthly Salary Credit",
          category: "Salary",
          amount: 65000,
          type: "credit",
          date: new Date(Date.now() - 3 * 86400000).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          referenceNo: "NEFT" + Math.floor(100000 + Math.random() * 900000),
          status: "Success",
        },
        {
          userId,
          title: "Electricity Bill Payment",
          category: "Bills",
          amount: 1450,
          type: "debit",
          date: new Date(Date.now() - 5 * 86400000).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          referenceNo: "BILL" + Math.floor(100000 + Math.random() * 900000),
          status: "Success",
        },
      ]);
    }

    res.json({
      success: true,
      message: "Transactions retrieved successfully from database",
      data: transactions,
    });
  } catch (error) {
    console.error("Get transactions error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch transactions" });
  }
};

// POST /api/transactions — Create a new transaction in MongoDB (e.g. fund transfer or payment)
exports.createTransaction = async (req, res) => {
  try {
    const { title, category, amount, type, beneficiaryName, toAccount, remarks } = req.body;

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "A valid positive transfer amount is required",
      });
    }

    const transactionTitle =
      title || (beneficiaryName ? `Transfer to ${beneficiaryName}` : "Fund Transfer");

    const newTransaction = new Transaction({
      userId: req.user.userID,
      title: transactionTitle,
      category: category || "Transfer",
      amount: Number(amount),
      type: type || "debit",
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      referenceNo: "IMPS" + Math.floor(100000 + Math.random() * 900000),
      status: "Success",
    });

    const savedTransaction = await newTransaction.save();

    res.status(201).json({
      success: true,
      message: "Transaction completed and saved to database successfully",
      data: savedTransaction,
    });
  } catch (error) {
    console.error("Create transaction error:", error.message);
    res.status(500).json({ success: false, message: "Failed to record transaction" });
  }
};
