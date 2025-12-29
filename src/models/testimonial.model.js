const { model, Schema } = require("mongoose");

const TestimonialSchema = new Schema(
  {
    heading: { type: String, required: true }, // e.g., "Helps reduce exam anxiety"
    quote: { type: String, required: true }, // The testimonial text
    authorName: { type: String, required: true }, // e.g., "Riya"
    authorClass: { type: String, required: true }, // e.g., "Class 12 Science"
    authorDetails: { type: String }, // e.g., "Class 12 • PCM"
    order: { type: Number, default: 0 }, // For custom ordering
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports.Testimonial = model("Testimonial", TestimonialSchema);

