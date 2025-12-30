const { model, Schema } = require("mongoose");

const FAQSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 }, // For custom ordering
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports.FAQ = model("FAQ", FAQSchema);

