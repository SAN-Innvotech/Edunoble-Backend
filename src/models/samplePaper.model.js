const { model, Schema } = require("mongoose");

const SamplePaperSchema = new Schema(
  {
    title: { type: String, required: true },
    class: { type: String, required: true }, // e.g. "10", "12"
    subject: { type: String, required: true }, // e.g. "Maths", "Physics"
    year: { type: Number, required: true },
    description: { type: String },
    board: { type: String }, // e.g. "CBSE", "ICSE"
    examType: { type: String }, // e.g. "Pre-board", "Final", "Sample"
    tags: [{ type: String }],
    fileUrl: { type: String, required: true }, // direct URL to the file
    driveFileId: { type: String }, // optional: internal Drive file id (if uploaded to Drive)
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports.SamplePaper = model("SamplePaper", SamplePaperSchema);


