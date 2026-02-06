const responses = require("../../utility/responses");
const homepageService = require("./homepage.service");

const createHomepage = async (req, res) => {
  try {
    const result = await homepageService.createHomepage(req.body);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }

    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("createHomepage controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const getHomepage = async (req, res) => {
  try {
    const result = await homepageService.getHomepage();
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("getHomepage controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const updateHomepage = async (req, res) => {
  try {
    const result = await homepageService.updateHomepage(req.params.id, req.body);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("updateHomepage controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const deleteHomepage = async (req, res) => {
  try {
    const result = await homepageService.deleteHomepage(req.params.id);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("deleteHomepage controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const updateHomepageSection = async (req, res) => {
  try {
    const { id, section } = req.params;
    const validSections = ["hero", "statistics", "features", "process", "mostViewedPapers", "featuredPapers", "studentsSay"];
    
    if (!validSections.includes(section)) {
      return responses.badRequestResponse(res, `Invalid section. Valid sections are: ${validSections.join(", ")}`);
    }

    const result = await homepageService.updateHomepageSection(id, section, req.body);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("updateHomepageSection controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

module.exports = {
  createHomepage,
  getHomepage,
  updateHomepage,
  updateHomepageSection,
  deleteHomepage,
};
