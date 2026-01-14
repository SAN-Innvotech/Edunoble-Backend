const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { User } = require("../../models/user.model");

const JWT_SECRET = process.env.JWT_SECRET || "secret123"; // Store in .env

// Nodemailer transporter for sending OTP emails
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const OTP_EXPIRY_MINUTES = Number(process.env.OTP_EXPIRY_MINUTES) || 5;

const register = async (body) => {
  try {
    const { email, phone, password } = body;
    const existing = await User.findOne({ $or: [{ email }, { phone }] });
    if (existing) {
      return { status: 409, message: "Email or phone already registered" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      ...body,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "30d",
    });

    return {
      status: 200,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token,
      },
    };
  } catch (error) {
    console.log("register service error", error);
    return { status: 500, message: "Registration failed" };
  }
};

const login = async ({ emailOrPhone, password }) => {
  try {
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!user) return { status: 401, message: "Invalid credentials" };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { status: 401, message: "Invalid credentials" };

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "30d",
    });

    return {
      status: 200,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token,
      },
    };
  } catch (error) {
    console.log("login service error", error);
    return { status: 500, message: "Login failed" };
  }
};

const sendAdminOtp = async ({ email }) => {
  try {
    if (!email) {
      return { status: 400, message: "email is required" };
    }

    const user = await User.findOne({ email });
    if (!user) {
      return { status: 404, message: "User not found" };
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpSentAt = new Date();
    await user.save();

    const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER;

    // Send OTP email
    await transporter.sendMail({
      from: fromEmail,
      to: user.email,
      subject: "Your EduNoble admin OTP",
      text: `Your OTP is ${otp}. It is valid for ${OTP_EXPIRY_MINUTES} minutes.`,
      html: `<p>Your OTP is <strong>${otp}</strong>. It is valid for ${OTP_EXPIRY_MINUTES} minutes.</p>`,
    });

    return {
      status: 200,
      data: { email: user.email },
    };
  } catch (error) {
    console.log("sendAdminOtp service error", error);
    return { status: 500, message: "Failed to send OTP" };
  }
};

const verifyAdminOtp = async ({ email, otp }) => {
  try {
    if (!email || !otp) {
      return { status: 400, message: "email and otp are required" };
    }

    const user = await User.findOne({ email });
    if (!user) {
      return { status: 401, message: "Invalid OTP or email" };
    }

    if (!user.otp || !user.otpSentAt) {
      return { status: 401, message: "OTP not requested or expired" };
    }

    const now = new Date();
    const diffMinutes = (now.getTime() - user.otpSentAt.getTime()) / (1000 * 60);
    if (diffMinutes > OTP_EXPIRY_MINUTES) {
      return { status: 401, message: "OTP expired" };
    }

    if (user.otp !== otp) {
      return { status: 401, message: "Invalid OTP" };
    }

    // Clear OTP fields
    user.otp = undefined;
    user.otpSentAt = undefined;
    await user.save();

    // Same response as login
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "30m",
    });

    return {
      status: 200,
      data: {
        id: user._id,
        token,
      },
    };
  } catch (error) {
    console.log("verifyAdminOtp service error", error);
    return { status: 500, message: "Failed to verify OTP" };
  }
};

const changePassword = async (userId, { newPassword }) => {
  try {
    if (!newPassword) {
      return { status: 400, message: "newPassword is required" };
    }

    const user = await User.findById(userId);
    if (!user) {
      return { status: 404, message: "User not found" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return {
      status: 200,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    };
  } catch (error) {
    console.log("changePassword service error", error);
    return { status: 500, message: "Failed to change password" };
  }
};

module.exports = {
  register,
  login,
  sendAdminOtp,
  verifyAdminOtp,
  changePassword,
};
