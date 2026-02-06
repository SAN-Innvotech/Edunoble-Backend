const { model, Schema } = require("mongoose");

const HomepageSchema = new Schema(
  {
    // Hero Section
    hero: {
      headline: { type: String, required: true }, // "Practice Sample Papers"
      subheading: { type: String }, // "for Class 8, 9, 10, 11 & 12"
      description: { type: String, required: true },
      pictureUrl1: { type: String }, // optional
      pictureUrl2: { type: String }, // optional
      pictureUrl3: { type: String }, // optional
      features: {
        feature1: { type: String, required: true }, // "Free Sample Papers"
        feature2: { type: String, required: true }, // "100% Accuracy"
        feature3: { type: String, required: true }, // "100% Accuracy"
      },
      samplePaperCount : { type: String, required: true }, // "10,000+"
      studentReview: {
        name: { type: String, required: true }, // "John Doe"
        class: { type: String, required: true }, // "Class 10"
        imageUrl: { type: String }, // optional
      }
    },

    mostViewedPapers : {
      heading: { type: String, required: true }, // "Most Viewed Papers"
      description: { type: String, required: true },
    },

    featuredPapers : {
      heading: { type: String, required: true }, // "Featured Papers"
      description: { type: String, required: true },
    },

    studentsSay : {
      heading: { type: String, required: true }, // "Students Say"
      description: { type: String, required: true },
    },

    // Statistics Section
    statistics: [
      {
        number: { type: String, required: true }, // "10,000+"
        label: { type: String, required: true }, // "Students practicing"
        order: { type: Number, default: 0 },
      },
    ],

    // Features Section
    features: {
      heading: { type: String, required: true }, // "Practice smarter for board exams with Edunoble"
      description: { type: String, required: true },
      featureList: [
        {
          text: { type: String, required: true },
        },
      ],
      ctaButtonText: { type: String, default: "Browse Sample Papers" },
      imageUrl: { type: String }, // Optional image URL
    },

    // Process Section (Why prepare with Edunoble)
    process: {
      heading: { type: String, required: true }, // "Why prepare with Edunoble sample papers?"
      subtitle: { type: String, required: true },
      steps: [
        {
          stepNumber: { type: String, required: true }, // "01", "02", "03"
          title: { type: String, required: true },
          description: { type: String, required: true },
          order: { type: Number, default: 0 },
        },
      ],
    },

    // General settings
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports.Homepage = model("Homepage", HomepageSchema);
