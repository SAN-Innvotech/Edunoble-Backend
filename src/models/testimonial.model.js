const { model, Schema } = require("mongoose");

const TestimonialSchema = new Schema(
  {
    heading: { type: String, required: true }, // e.g., "Helps reduce exam anxiety"
    quote: { type: String, required: true }, // The testimonial text
    authorName: { type: String, required: true }, // e.g., "Riya"
    authorClass: { type: String, required: true }, // e.g., "Class 12 Science"
    authorDetails: { type: String }, // e.g., "Class 12 • PCM"
    photoUrl: { type: String, default: "" }, // Cloudinary URL of the student's photo
    rating: { type: Number, default: null, min: 1, max: 5 }, // 1-5 star rating, nullable
    order: { type: Number, default: 0 }, // For custom ordering
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports.Testimonial = model("Testimonial", TestimonialSchema);

