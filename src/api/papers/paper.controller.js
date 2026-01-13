const responses = require("../../utility/responses");
const paperService = require("./paper.service");

const createPaper = async (req, res) => {
  try {
    const { class: className, subject, year, description, board, examType, tags, title, fileUrl } = req.body;

    if (!className || !subject || !year || !title || !fileUrl) {
      return responses.badRequestResponse(res, "title, class, subject, year and fileUrl are required");
    }

    const payload = {
      title,
      class: className,
      subject,
      year: Number(year),
      description,
      board,
      examType,
      tags: tags ? String(tags).split(",").map((t) => t.trim()).filter(Boolean) : [],
      fileUrl,
      createdBy: req.user && req.user.id,
    };

    const result = await paperService.createPaper(payload);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }

    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("createPaper controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const getPapers = async (req, res) => {
  try {
    const result = await paperService.getPapers(req.query);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    
    // Use paginated response if pagination info exists
    if (result.pagination) {
      return responses.paginatedResponse(
        res,
        result.data,
        result.pagination.total,
        result.pagination.offset
      );
    }
    
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("getPapers controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const getPaperById = async (req, res) => {
  try {
    const result = await paperService.getPaperById(req.params.id);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("getPaperById controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const getFeaturedPapers = async (req, res) => {
  try {
    const result = await paperService.getFeaturedPapers(req.query);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("getFeaturedPapers controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const adminListPapers = async (req, res) => {
  try {
    const result = await paperService.adminListPapers(req.query);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    
    // Use paginated response if pagination info exists
    if (result.pagination) {
      return responses.paginatedResponse(
        res,
        result.data,
        result.pagination.total,
        result.pagination.offset
      );
    }
    
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("adminListPapers controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const updatePaper = async (req, res) => {
  try {
    const result = await paperService.updatePaper(req.params.id, req.body);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("updatePaper controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const deletePaper = async (req, res) => {
  try {
    const result = await paperService.deletePaper(req.params.id);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("deletePaper controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const getMetadata = async (req, res) => {
  try {
    const result = await paperService.getMetadata();
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("getMetadata controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const getSubjectsByClass = async (req, res) => {
  try {
    const result = await paperService.getSubjectsByClass();
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("getSubjectsByClass controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const incrementViewCount = async (req, res) => {
  try {
    const result = await paperService.incrementViewCount(req.params.id);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("incrementViewCount controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const getDashboardAnalytics = async (req, res) => {
  try {
    const result = await paperService.getDashboardAnalytics();
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("getDashboardAnalytics controller error", err);
    return responses.internalFailureResponse(res, err);
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


