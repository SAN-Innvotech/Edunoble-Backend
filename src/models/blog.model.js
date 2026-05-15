const { model, Schema } = require("mongoose");

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String }, // Short 1-2 sentence summary
    content: { type: String }, // HTML body
    coverImage: { type: String }, // Cloudinary URL of the cover image
    author: { type: String, default: "EduNoble Team" },
    category: { type: String, default: "General" },
    tags: { type: [String] },
    isPublished: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
    viewCount: { type: Number, default: 0 },
    order: { type: Number, default: 0 }, // For custom ordering
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports.Blog = model("Blog", BlogSchema);
