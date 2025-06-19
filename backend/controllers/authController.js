const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const Retailer = require('../models/Retailer');
const { sendOTPEmail } = require('../utils/emailService');

// POST /api/auth/signup
exports.signup = async (req, res) => {
  const { shopName, email, password } = req.body;

  try {
    const existing = await Retailer.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = uuidv4().split('-')[0];
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    const retailer = new Retailer({ shopName, email, password: hashedPassword, otp, otpExpiresAt });
    await retailer.save();

    await sendOTPEmail(email, otp, shopName);

    res.status(201).json({ message: 'Signup successful. Please verify OTP sent to your email.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /api/auth/verify-otp
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const retailer = await Retailer.findOne({ email });
    if (!retailer) return res.status(404).json({ message: 'Retailer not found' });

    if (retailer.isEmailVerified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    if (retailer.otp !== otp || retailer.otpExpiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    retailer.isEmailVerified = true;
    retailer.otp = null;
    retailer.otpExpiresAt = null;
    await retailer.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const retailer = await Retailer.findOne({ email });
    if (!retailer) return res.status(404).json({ message: 'Retailer not found' });

    if (!retailer.isEmailVerified) {
      return res.status(401).json({ message: 'Email not verified' });
    }

    const isMatch = await bcrypt.compare(password, retailer.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: retailer._id, shopName: retailer.shopName, email: retailer.email },
      process.env.JWT_SECRET,
      { expiresIn: '10h' }
    );

    res.status(200).json({ token, shopName: retailer.shopName });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
