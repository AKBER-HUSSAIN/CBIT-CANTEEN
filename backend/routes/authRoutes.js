const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

dotenv.config();

const router = express.Router();

// ✅ Signup Route with OTP Email Verification
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  // Manual Password Validation (without regex)
  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters long." });
  }

  let hasUpperCase = false;
  let hasLowerCase = false;
  let hasNumbers = false;
  let hasSpecialChar = false;
  const specialChars = ['@', '$', '!', '%', '*', '?', '&'];

  for (let char of password) {
    if (char >= 'A' && char <= 'Z') hasUpperCase = true;
    if (char >= 'a' && char <= 'z') hasLowerCase = true;
    if (char >= '0' && char <= '9') hasNumbers = true;
    if (specialChars.includes(char)) hasSpecialChar = true;
  }

  if (!hasUpperCase) return res.status(400).json({ message: "Password must contain at least one uppercase letter." });
  if (!hasLowerCase) return res.status(400).json({ message: "Password must contain at least one lowercase letter." });
  if (!hasNumbers) return res.status(400).json({ message: "Password must contain at least one number." });
  if (!hasSpecialChar) return res.status(400).json({ message: "Password must contain at least one special character." });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("🟩 SIGNUP DEBUG:");
    console.log("Entered password:", password);

    const newUser = new User({
      name,
      email,
      password: password,
      role,
      isVerified: false,
      otp,
      otpExpiresAt,
    });

    console.log("Saving new user to the database...", newUser);
    await newUser.save();
    console.log("User saved successfully:", newUser);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Email Verification',
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Signup successful! Check your email for the OTP.' });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Login Route with OTP Email Verification (Step 1)
// ✅ Login Route with OTP Email Verification (Step 1)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    console.log("🟦 LOGIN DEBUG:");
    console.log("Entered password:", password);
    console.log("Stored hashed password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Generate OTP
    const otp = crypto.randomBytes(3).toString("hex").toUpperCase();
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'OTP for Login Verification',
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "OTP sent to your email. Please verify.",
      // We include user role in the response
      user: { role: user.role }
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ OTP Verification Route (Step 2)
// ✅ OTP Verification Route (Step 2)
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (Date.now() > new Date(user.otpExpiresAt)) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Reset OTP after successful verification
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    // Generate JWT token and include user role in the payload
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the response with the JWT and user data
    res.status(200).json({
      message: "OTP verified successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // Send the user's role here
      },
    });
  } catch (error) {
    console.error("❌ OTP Verification Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
