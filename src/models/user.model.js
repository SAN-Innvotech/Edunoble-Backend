const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    password: { type: String, required: true },
    otp: { type: String },
    otpSentAt: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports.User = model("User", UserSchema);
