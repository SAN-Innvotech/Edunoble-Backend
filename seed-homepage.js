require("dotenv").config();
const mongoose = require("mongoose");
const { Homepage } = require("./src/models/homepage.model");

const homepageData = {
  hero: {
    headline: "Practice Sample Papers",
    subheading: "for Class 8, 9, 10, 11 & 12",
    description: "Access high-quality sample papers for Class 8, 9, 10, 11 and 12 in a secure online environment. No downloads, just focused exam practice.",
    pictureUrl1: null, // Add image URLs if available
    pictureUrl2: null,
    pictureUrl3: null,
    features: {
      feature1: "Latest sample papers",
      feature2: "CBSE, ICSE & State Boards",
      feature3: "Secure, read-only access",
    },
    samplePaperCount: "1000+",
    studentReview: {
      name: "Ali Tufan",
      class: "Class 12th Student",
      imageUrl: null, // Add image URL if available
    },
  },
  mostViewedPapers: {
    heading: "Most Viewed Papers",
    description: "Explore the most popular sample papers that students are practicing",
  },
  featuredPapers: {
    heading: "Featured Papers",
    description: "Handpicked sample papers recommended for your exam preparation",
  },
  studentsSay: {
    heading: "Students Say",
    description: "Read what our students have to say about their experience with Edunoble",
  },
  statistics: [
    {
      number: "10,000+",
      label: "Students practicing",
      order: 1,
    },
    {
      number: "500+",
      label: "Sample papers",
      order: 2,
    },
    {
      number: "150+",
      label: "Schools using Edunoble",
      order: 3,
    },
    {
      number: "3",
      label: "Classes covered (10-12)",
      order: 4,
    },
  ],
  features: {
    heading: "Practice smarter for board exams with Edunoble",
    description: "Use the list below to see how our secure online sample papers help Class 8, 9, 10, 11 and 12 students prepare with confidence.",
    featureList: [
      {
        text: "Board-style sample papers for Classes 10-12",
      },
      {
        text: "Secure, read-only viewing (no downloads or screenshots)",
      },
      {
        text: "CBSE-focused, NCERT-aligned questions",
      },
      {
        text: "Designed to reduce exam stress with realistic practice",
      },
    ],
    ctaButtonText: "Browse Sample Papers",
    imageUrl: null, // Add image URL if available
  },
  process: {
    heading: "Why prepare with Edunoble sample papers?",
    subtitle: "See how our simple three-step flow helps Class 10-12 students get exam-ready with realistic, secure online practice.",
    steps: [
      {
        stepNumber: "01",
        title: "Choose your class & subject",
        description: "Pick from Class 10, 11 or 12 and select the subject you want to practice first.",
        order: 1,
      },
      {
        stepNumber: "02",
        title: "Solve sample papers in a secure viewer",
        description: "Attempt full-length, board-style papers online without downloads or distractions.",
        order: 2,
      },
      {
        stepNumber: "03",
        title: "Analyse & improve",
        description: "Review solutions, identify weak areas and repeat with new papers to build confidence.",
        order: 3,
      },
    ],
  },
  isActive: true,
};

async function seedHomepage() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing homepage (optional - comment out if you want to keep existing data)
    // await Homepage.deleteMany({});
    // console.log("Cleared existing homepage data");

    // Insert homepage
    const result = await Homepage.create(homepageData);
    console.log(`Successfully created homepage with ID: ${result._id}`);

    // Close connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding homepage:", error);
    process.exit(1);
  }
}

seedHomepage();
