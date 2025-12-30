const { model, Schema } = require("mongoose");

const ContactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    subject: { type: String },
    message: { type: String, required: true },
    source: { type: String }, // e.g. "website", "mobile-app"
    isResolved: { type: Boolean, default: false },
    resolvedAt: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports.Contact = model("Contact", ContactSchema);


