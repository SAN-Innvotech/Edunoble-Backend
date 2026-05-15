const { model, Schema } = require("mongoose");

const CourseSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String }, // Short description
    longDescription: { type: String }, // HTML body
    subject: { type: String },
    classLevel: { type: String },
    mode: { type: String }, // e.g., "Online", "Offline", "Online & Offline"
    duration: { type: String }, // e.g., "6 Months"
    feeRange: { type: String }, // e.g., "₹8,000 – ₹12,000"
    highlights: { type: [String] },
    coverImage: { type: String }, // Cloudinary URL of the cover image
    enrollCtaText: { type: String, default: "Book a Free Demo" },
    order: { type: Number, default: 0 }, // For custom ordering
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports.Course = model("Course", CourseSchema);
