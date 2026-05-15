const { model, Schema } = require("mongoose");

const TopperSchema = new Schema(
  {
    studentName: { type: String, required: true },
    photo: { type: String }, // Cloudinary URL of the student's photo
    examName: { type: String },
    score: { type: String }, // e.g., "98.4%"
    year: { type: String },
    classLevel: { type: String },
    board: { type: String }, // e.g., "CBSE", "ICSE", "State Board"
    achievement: { type: String },
    quote: { type: String },
    order: { type: Number, default: 0 }, // For custom ordering
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports.Topper = model("Topper", TopperSchema);
