const { SamplePaper } = require("../../models/samplePaper.model");
const { Testimonial } = require("../../models/testimonial.model");
const { Contact } = require("../../models/contact.model");
const { User } = require("../../models/user.model");
const { FAQ } = require("../../models/faq.model");

const createPaper = async (payload) => {
  try {
    const paper = await SamplePaper.create(payload);
    return { status: 200, data: paper };
  } catch (err) {
    console.log("createPaper service error", err);
    return { status: 500, message: "Failed to create paper" };
  }
};

const getPapers = async (filters = {}) => {
  try {
    const query = { isActive: true };

    if (filters.class) query.class = filters.class;
    if (filters.subject) query.subject = filters.subject;
    if (filters.year) query.year = Number(filters.year);
    if (filters.board) query.board = filters.board;
    if (filters.examType) query.examType = filters.examType;

    // Search (case-insensitive) across title, subject, description, board, examType, tags
    if (filters.search) {
      const searchRegex = new RegExp(filters.search, "i");
      query.$or = [
        { title: searchRegex },
        { subject: searchRegex },
        { description: searchRegex },
        { board: searchRegex },
        { examType: searchRegex },
         // tags is an array of strings; this will match if any tag matches the regex
        { tags: searchRegex },
      ];
    }

    // Pagination
    const limit = filters.limit ? Math.min(Number(filters.limit), 100) : 20; // Max 100, default 20
    const offset = filters.offset ? Math.max(Number(filters.offset), 0) : 0;

    // Get total count for pagination
    const total = await SamplePaper.countDocuments(query);

    // Sorting
    const sortBy = filters.sortBy || "default";
    let papers;

    // Use aggregation for class sorting to handle numeric conversion
    if (sortBy === "class-asc" || sortBy === "class-desc") {
      const classSortOrder = sortBy === "class-asc" ? 1 : -1;
      
      const pipeline = [
        { $match: query },
        {
          $addFields: {
            // Convert string to number for sorting, default to 0 if conversion fails
            classNumeric: {
              $convert: {
                input: "$class",
                to: "int",
                onError: 0,
                onNull: 0
              }
            }
          }
        },
        {
          $sort: {
            classNumeric: classSortOrder,
            year: -1,
            createdAt: -1
          }
        },
        { $skip: offset },
        { $limit: limit },
        {
          $project: {
            classNumeric: 0 // Remove the computed field from results
          }
        }
      ];

      papers = await SamplePaper.aggregate(pipeline);
    } else {
      // Use regular find for other sort options
      let sortCriteria = {};
      
      switch (sortBy) {
        case "year-newest":
          sortCriteria = { year: -1, createdAt: -1 };
          break;
        case "year-oldest":
          sortCriteria = { year: 1, createdAt: 1 };
          break;
        case "subject-asc":
          sortCriteria = { subject: 1, year: -1, createdAt: -1 };
          break;
        case "subject-desc":
          sortCriteria = { subject: -1, year: -1, createdAt: -1 };
          break;
        default: // "default"
          sortCriteria = { year: -1, createdAt: -1 };
          break;
      }

      papers = await SamplePaper.find(query)
        .sort(sortCriteria)
        .skip(offset)
        .limit(limit);
    }

    return {
      status: 200,
      data: papers,
      pagination: {
        total,
        offset,
        limit,
        hasMore: offset + limit < total,
      },
    };
  } catch (err) {
    console.log("getPapers service error", err);
    return { status: 500, message: "Failed to fetch papers" };
  }
};

const getPaperById = async (id) => {
  try {
    const paper = await SamplePaper.findById(id);
    if (!paper || !paper.isActive) {
      return { status: 404, message: "Paper not found" };
    }
    return { status: 200, data: paper };
  } catch (err) {
    console.log("getPaperById service error", err);
    return { status: 500, message: "Failed to fetch paper" };
  }
};

const incrementViewCount = async (id) => {
  try {
    const paper = await SamplePaper.findByIdAndUpdate(
      id,
      { $inc: { viewCount: 1 } },
      { new: true }
    );
    if (!paper || !paper.isActive) {
      return { status: 404, message: "Paper not found" };
    }
    return { status: 200, data: { viewCount: paper.viewCount } };
  } catch (err) {
    console.log("incrementViewCount service error", err);
    return { status: 500, message: "Failed to increment view count" };
  }
};

const getFeaturedPapers = async (filters = {}) => {
  try {
    const query = { isActive: true, featured: true };

    if (filters.class) query.class = filters.class;

    const limit = filters.limit ? Math.min(Number(filters.limit), 50) : 8; // default 8 featured

    const papers = await SamplePaper.find(query)
      .sort({ year: -1, createdAt: -1 })
      .limit(limit);

    return { status: 200, data: papers };
  } catch (err) {
    console.log("getFeaturedPapers service error", err);
    return { status: 500, message: "Failed to fetch featured papers" };
  }
};

const adminListPapers = async (filters = {}) => {
  try {
    const query = {}; // No isActive filter - return all papers

    if (filters.class) query.class = filters.class;
    if (filters.subject) query.subject = filters.subject;
    if (filters.year) query.year = Number(filters.year);
    if (filters.board) query.board = filters.board;
    if (filters.examType) query.examType = filters.examType;

    // Search (case-insensitive) across title, subject, description, board, examType, tags
    if (filters.search) {
      const searchRegex = new RegExp(filters.search, "i");
      query.$or = [
        { title: searchRegex },
        { subject: searchRegex },
        { description: searchRegex },
        { board: searchRegex },
        { examType: searchRegex },
         // tags is an array of strings; this will match if any tag matches the regex
        { tags: searchRegex },
      ];
    }

    // Pagination
    const limit = filters.limit ? Math.min(Number(filters.limit), 100) : 20; // Max 100, default 20
    const offset = filters.offset ? Math.max(Number(filters.offset), 0) : 0;

    // Get total count for pagination
    const total = await SamplePaper.countDocuments(query);

    // Sorting
    const sortBy = filters.sortBy || "default";
    let papers;

    // Use aggregation for class sorting to handle numeric conversion
    if (sortBy === "class-asc" || sortBy === "class-desc") {
      const classSortOrder = sortBy === "class-asc" ? 1 : -1;
      
      const pipeline = [
        { $match: query },
        {
          $addFields: {
            // Convert string to number for sorting, default to 0 if conversion fails
            classNumeric: {
              $convert: {
                input: "$class",
                to: "int",
                onError: 0,
                onNull: 0
              }
            }
          }
        },
        {
          $sort: {
            classNumeric: classSortOrder,
            year: -1,
            createdAt: -1
          }
        },
        { $skip: offset },
        { $limit: limit },
        {
          $project: {
            classNumeric: 0 // Remove the computed field from results
          }
        }
      ];

      papers = await SamplePaper.aggregate(pipeline);
    } else {
      // Use regular find for other sort options
      let sortCriteria = {};
      
      switch (sortBy) {
        case "year-newest":
          sortCriteria = { year: -1, createdAt: -1 };
          break;
        case "year-oldest":
          sortCriteria = { year: 1, createdAt: 1 };
          break;
        case "subject-asc":
          sortCriteria = { subject: 1, year: -1, createdAt: -1 };
          break;
        case "subject-desc":
          sortCriteria = { subject: -1, year: -1, createdAt: -1 };
          break;
        default: // "default"
          sortCriteria = { year: -1, createdAt: -1 };
          break;
      }

      papers = await SamplePaper.find(query)
        .sort(sortCriteria)
        .skip(offset)
        .limit(limit);
    }

    return {
      status: 200,
      data: papers,
      pagination: {
        total,
        offset,
        limit,
        hasMore: offset + limit < total,
      },
    };
  } catch (err) {
    console.log("adminListPapers service error", err);
    return { status: 500, message: "Failed to fetch papers" };
  }
};

const updatePaper = async (id, body) => {
  try {
    const paper = await SamplePaper.findByIdAndUpdate(id, body, { new: true });
    if (!paper) {
      return { status: 404, message: "Paper not found" };
    }
    return { status: 200, data: paper };
  } catch (err) {
    console.log("updatePaper service error", err);
    return { status: 500, message: "Failed to update paper" };
  }
};

const deletePaper = async (id) => {
  try {
    const paper = await SamplePaper.findByIdAndDelete(id);
    if (!paper) {
      return { status: 404, message: "Paper not found" };
    }
    return { status: 200, data: {} };
  } catch (err) {
    console.log("deletePaper service error", err);
    return { status: 500, message: "Failed to delete paper" };
  }
};

const getMetadata = async () => {
  try {
    // Get unique values with counts from active papers only
    const query = { isActive: true };
    
    // Use aggregation to get distinct values with counts
    const [classesData, subjectsData, boardsData, yearsData, examTypesData] = await Promise.all([
      SamplePaper.aggregate([
        { $match: { ...query, class: { $exists: true, $ne: null } } },
        { $group: { _id: "$class", count: { $sum: 1 } } },
        { $project: { name: "$_id", count: 1, _id: 0 } },
        { $sort: { name: 1 } },
      ]),
      SamplePaper.aggregate([
        { $match: { ...query, subject: { $exists: true, $ne: null } } },
        { $group: { _id: "$subject", count: { $sum: 1 } } },
        { $project: { name: "$_id", count: 1, _id: 0 } },
        { $sort: { name: 1 } },
      ]),
      SamplePaper.aggregate([
        { $match: { ...query, board: { $exists: true, $ne: null } } },
        { $group: { _id: "$board", count: { $sum: 1 } } },
        { $project: { name: "$_id", count: 1, _id: 0 } },
        { $sort: { name: 1 } },
      ]),
      SamplePaper.aggregate([
        { $match: { ...query, year: { $exists: true, $ne: null } } },
        { $group: { _id: "$year", count: { $sum: 1 } } },
        { $project: { name: "$_id", count: 1, _id: 0 } },
        { $sort: { name: -1 } }, // Descending (newest first)
      ]),
      SamplePaper.aggregate([
        { $match: { ...query, examType: { $exists: true, $ne: null } } },
        { $group: { _id: "$examType", count: { $sum: 1 } } },
        { $project: { name: "$_id", count: 1, _id: 0 } },
        { $sort: { name: 1 } },
      ]),
    ]);

    // Convert classes to numbers for proper sorting
    const sortedClasses = classesData
      .map(item => ({ name: item.name, count: item.count }))
      .sort((a, b) => Number(a.name) - Number(b.name));

    // Convert years to numbers for proper sorting
    const sortedYears = yearsData
      .map(item => ({ name: item.name, count: item.count }))
      .sort((a, b) => Number(b.name) - Number(a.name)); // Descending

    return {
      status: 200,
      data: {
        classes: sortedClasses,
        subjects: subjectsData.map(item => ({ name: item.name, count: item.count })),
        boards: boardsData.map(item => ({ name: item.name, count: item.count })),
        years: sortedYears,
        examTypes: examTypesData.map(item => ({ name: item.name, count: item.count })),
      },
    };
  } catch (err) {
    console.log("getMetadata service error", err);
    return { status: 500, message: "Failed to fetch metadata" };
  }
};

const getSubjectsByClass = async () => {
  try {
    const query = { isActive: true };
    
    // Group papers by class and subject, count papers for each combination
    const subjectsByClass = await SamplePaper.aggregate([
      { 
        $match: { 
          ...query, 
          class: { $exists: true, $ne: null },
          subject: { $exists: true, $ne: null }
        } 
      },
      {
        $group: {
          _id: {
            class: "$class",
            subject: "$subject"
          },
          paperCount: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          class: "$_id.class",
          subject: "$_id.subject",
          paperCount: 1
        }
      },
      {
        $sort: {
          paperCount: -1
        }
      },
      {
        $limit: 6
      }
    ]);

    // Format class as "10th", "11th", "12th" etc.
    const formattedData = subjectsByClass.map(item => ({
      class: `${item.class}th`,
      subject: item.subject,
      paperCount: item.paperCount
    }));

    return {
      status: 200,
      data: formattedData,
    };
  } catch (err) {
    console.log("getSubjectsByClass service error", err);
    return { status: 500, message: "Failed to fetch subjects by class" };
  }
};

const getDashboardAnalytics = async () => {
  try {
    // Get total views (sum of all viewCounts)
    const totalViewsResult = await SamplePaper.aggregate([
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$viewCount" }
        }
      }
    ]);
    const totalViews = totalViewsResult[0]?.totalViews || 0;

    // Get top 5 papers by viewCount
    const topPapers = await SamplePaper.find({})
      .select("title class subject viewCount isActive featured createdAt")
      .sort({ viewCount: -1 })
      .limit(5)
      .lean();

    // Get paper statistics
    const paperStats = await SamplePaper.aggregate([
      {
        $group: {
          _id: null,
          totalPapers: { $sum: 1 },
          activePapers: {
            $sum: { $cond: ["$isActive", 1, 0] }
          },
          inactivePapers: {
            $sum: { $cond: ["$isActive", 0, 1] }
          },
          featuredPapers: {
            $sum: { $cond: ["$featured", 1, 0] }
          }
        }
      }
    ]);

    // Get testimonial statistics
    const testimonialStats = await Testimonial.aggregate([
      {
        $group: {
          _id: null,
          totalTestimonials: { $sum: 1 },
          activeTestimonials: {
            $sum: { $cond: ["$isActive", 1, 0] }
          },
          inactiveTestimonials: {
            $sum: { $cond: ["$isActive", 0, 1] }
          }
        }
      }
    ]);

    // Get contact statistics
    const contactStats = await Contact.aggregate([
      {
        $group: {
          _id: null,
          totalContacts: { $sum: 1 },
          resolvedContacts: {
            $sum: { $cond: ["$isResolved", 1, 0] }
          },
          unresolvedContacts: {
            $sum: { $cond: ["$isResolved", 0, 1] }
          }
        }
      }
    ]);

    // Get user statistics
    const userStats = await User.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          activeUsers: {
            $sum: { $cond: ["$isActive", 1, 0] }
          },
          inactiveUsers: {
            $sum: { $cond: ["$isActive", 0, 1] }
          }
        }
      }
    ]);

    // Get FAQ statistics
    const faqStats = await FAQ.aggregate([
      {
        $group: {
          _id: null,
          totalFAQs: { $sum: 1 },
          activeFAQs: {
            $sum: { $cond: ["$isActive", 1, 0] }
          },
          inactiveFAQs: {
            $sum: { $cond: ["$isActive", 0, 1] }
          }
        }
      }
    ]);

    // Get recent papers (last week)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const recentPapers = await SamplePaper.find({
      createdAt: { $gte: oneWeekAgo }
    })
      .select("title class subject createdAt isActive")
      .sort({ createdAt: -1 })
      .lean();

    // Get papers by class distribution
    const papersByClass = await SamplePaper.aggregate([
      {
        $group: {
          _id: "$class",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Get papers by subject distribution (top 5)
    const papersBySubject = await SamplePaper.aggregate([
      {
        $group: {
          _id: "$subject",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      }
    ]);

    return {
      status: 200,
      data: {
        totalViews,
        topPapers: topPapers.map(paper => ({
          id: paper._id,
          title: paper.title,
          class: paper.class,
          subject: paper.subject,
          viewCount: paper.viewCount,
          isActive: paper.isActive,
          featured: paper.featured,
          createdAt: paper.createdAt,
        })),
        papers: {
          total: paperStats[0]?.totalPapers || 0,
          active: paperStats[0]?.activePapers || 0,
          inactive: paperStats[0]?.inactivePapers || 0,
          featured: paperStats[0]?.featuredPapers || 0,
        },
        testimonials: {
          total: testimonialStats[0]?.totalTestimonials || 0,
          active: testimonialStats[0]?.activeTestimonials || 0,
          inactive: testimonialStats[0]?.inactiveTestimonials || 0,
        },
        contacts: {
          total: contactStats[0]?.totalContacts || 0,
          resolved: contactStats[0]?.resolvedContacts || 0,
          unresolved: contactStats[0]?.unresolvedContacts || 0,
        },
        users: {
          total: userStats[0]?.totalUsers || 0,
          active: userStats[0]?.activeUsers || 0,
          inactive: userStats[0]?.inactiveUsers || 0,
        },
        faqs: {
          total: faqStats[0]?.totalFAQs || 0,
          active: faqStats[0]?.activeFAQs || 0,
          inactive: faqStats[0]?.inactiveFAQs || 0,
        },
        recentPapers: recentPapers.map(paper => ({
          id: paper._id,
          title: paper.title,
          class: paper.class,
          subject: paper.subject,
          isActive: paper.isActive,
          createdAt: paper.createdAt,
        })),
        distribution: {
          byClass: papersByClass.map(item => ({
            class: item._id,
            count: item.count,
          })),
          bySubject: papersBySubject.map(item => ({
            subject: item._id,
            count: item.count,
          })),
        },
      },
    };
  } catch (err) {
    console.log("getDashboardAnalytics service error", err);
    return { status: 500, message: "Failed to fetch dashboard analytics" };
  }
};

module.exports = {
  createPaper,
  getPapers,
  getPaperById,
  getFeaturedPapers,
  adminListPapers,
  updatePaper,
  deletePaper,
  getMetadata,
  getSubjectsByClass,
  incrementViewCount,
  getDashboardAnalytics,
};


