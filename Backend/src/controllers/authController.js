const User = require("../models/User");
const Transaction = require("../models/Transaction");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST /login — Authenticate user and return JWT
exports.login = async (req, res) => {
  try {
    const { CustomerID, Password } = req.body;

    if (!CustomerID || !Password) {
      return res.status(400).json({
        success: false,
        message: "Customer ID and Password are required",
      });
    }

    // Find user in MongoDB
    const user = await User.findOne({ CustomerID: CustomerID.trim() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Customer ID or Password",
      });
    }

    // Verify password with bcrypt
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Customer ID or Password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userID: user._id,
        CustomerID: user.CustomerID,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5h" }
    );

    res.json({
      success: true,
      access_token: token,
      CustomerID: user.CustomerID,
      UserName: user.UserName,
      fullname: user.fullname,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// POST /signup — Register a new NetBanking user
exports.signup = async (req, res) => {
  try {
    const { UserName, fullname, CustomerID, Password, country, mobileNumber } = req.body;

    if (!UserName || !fullname || !CustomerID || !Password || !country || !mobileNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if CustomerID already exists
    const existingUser = await User.findOne({ CustomerID: CustomerID.trim() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Customer ID is already registered",
      });
    }

    // Create and save new user
    const newUser = new User({
      UserName: UserName.trim(),
      fullname: fullname.trim(),
      CustomerID: CustomerID.trim(),
      Password,
      country: country.trim(),
      mobileNumber: mobileNumber.trim(),
    });

    const savedUser = await newUser.save();

    // Seed 3 initial demo transactions in MongoDB for this user
    await Transaction.insertMany([
      {
        userId: savedUser._id,
        title: "Account Opening Initial Deposit",
        category: "Deposit",
        amount: 25000,
        type: "credit",
        date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        referenceNo: "INIT" + Math.floor(100000 + Math.random() * 900000),
        status: "Success",
      },
      {
        userId: savedUser._id,
        title: "Welcome Bonus Cashback",
        category: "Rewards",
        amount: 500,
        type: "credit",
        date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        referenceNo: "REW" + Math.floor(100000 + Math.random() * 900000),
        status: "Success",
      },
      {
        userId: savedUser._id,
        title: "Online Debit Card Issuance Fee",
        category: "Charges",
        amount: 150,
        type: "debit",
        date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        referenceNo: "FEE" + Math.floor(100000 + Math.random() * 900000),
        status: "Success",
      },
    ]);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// GET /api/user-profile — Fetch profile of the logged in user
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userID).select("-Password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch profile" });
  }
};
