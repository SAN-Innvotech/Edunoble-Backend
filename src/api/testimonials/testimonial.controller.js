const responses = require("../../utility/responses");
const testimonialService = require("./testimonial.service");

const createTestimonial = async (req, res) => {
  try {
    const { heading, quote, authorName, authorClass, authorDetails, order, isActive } = req.body;

    if (!heading || !quote || !authorName || !authorClass) {
      return responses.badRequestResponse(res, "heading, quote, authorName, and authorClass are required");
    }

    const payload = {
      heading,
      quote,
      authorName,
      authorClass,
      authorDetails,
      order: order ? Number(order) : 0,
      isActive: isActive !== undefined ? isActive : true,
    };

    const result = await testimonialService.createTestimonial(payload);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }

    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("createTestimonial controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const listTestimonials = async (req, res) => {
  try {
    const result = await testimonialService.listTestimonials();
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("listTestimonials controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const getTestimonialById = async (req, res) => {
  try {
    const result = await testimonialService.getTestimonialById(req.params.id);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("getTestimonialById controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const result = await testimonialService.updateTestimonial(req.params.id, req.body);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("updateTestimonial controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const result = await testimonialService.deleteTestimonial(req.params.id);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("deleteTestimonial controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const adminListTestimonials = async (req, res) => {
  try {
    const result = await testimonialService.adminListTestimonials();
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("adminListTestimonials controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

module.exports = {
  createTestimonial,
  listTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
  adminListTestimonials,
};

