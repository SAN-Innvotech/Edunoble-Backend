const { model, Schema } = require("mongoose");

const ContentPageSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    pictureUrl: { type: String }, // optional
    type: { 
      type: String, 
      required: true, 
      enum: ["about", "vision"] 
    },
    order: { type: Number, default: 0 }, // For custom ordering
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports.ContentPage = model("ContentPage", ContentPageSchema);
