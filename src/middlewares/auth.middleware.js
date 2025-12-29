const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const responses = require("../utility/responses");

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      return responses.authFailureResponse(res, "Authorization token missing");
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      return responses.authFailureResponse(res, "Invalid or inactive user");
    }

    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };

    return next();
  } catch (err) {
    console.log("auth middleware error", err);
    return responses.authFailureResponse(res, "Invalid token");
  }
};

module.exports = authMiddleware;


