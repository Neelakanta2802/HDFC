const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  CustomerID: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook: Hash password before saving to MongoDB
UserSchema.pre("save", async function () {
  if (!this.isModified("Password")) return;

  const salt = await bcrypt.genSalt(10);
  this.Password = await bcrypt.hash(this.Password, salt);
});

module.exports = mongoose.model("User", UserSchema);
