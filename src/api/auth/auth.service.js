const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user.model");

const JWT_SECRET = process.env.JWT_SECRET || "secret123"; // Store in .env

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

module.exports = {
  register,
  login,
};
