const { model, Schema } = require("mongoose");

const LeadSchema = new Schema(
  {
    name: { type: String, required: true },
    number: { type: String, required: true },
    grade: { type: String },
    subject: { type: String },
  },
  { timestamps: true }
);

module.exports.Lead = model("Lead", LeadSchema);
