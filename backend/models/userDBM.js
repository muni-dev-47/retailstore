const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String
  },
  isGoogleUser: {
    type: Boolean,
    default: false
  },
  shopName: {
    type: String,
    required: true
  },
  shopAddress: {
    shopAdd: { type: String, required: true },
    mobileNumber: {
      type: Number,
      required: true,
    },
    district: { type: String, required: true }
  }
});

module.exports = mongoose.model("User", userSchema);
