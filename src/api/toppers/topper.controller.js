const responses = require("../../utility/responses");
const topperService = require("./topper.service");

const createTopper = async (req, res) => {
  try {
    const {
      studentName,
      photo,
      examName,
      score,
      year,
      classLevel,
      board,
      achievement,
      quote,
      order,
      isActive,
    } = req.body;

    if (!studentName) {
      return responses.badRequestResponse(res, "studentName is required");
    }

    const payload = {
      studentName,
      photo: photo !== undefined ? photo : "",
      examName,
      score,
      year,
      classLevel,
      board,
      achievement,
      quote,
      order: order ? Number(order) : 0,
      isActive: isActive !== undefined ? isActive : true,
    };

    const result = await topperService.createTopper(payload);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }

    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("createTopper controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const listToppers = async (req, res) => {
  try {
    const result = await topperService.listToppers();
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("listToppers controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const updateTopper = async (req, res) => {
  try {
    const result = await topperService.updateTopper(req.params.id, req.body);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("updateTopper controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const deleteTopper = async (req, res) => {
  try {
    const result = await topperService.deleteTopper(req.params.id);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("deleteTopper controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const adminListToppers = async (req, res) => {
  try {
    const result = await topperService.adminListToppers();
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("adminListToppers controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

module.exports = {
  createTopper,
  listToppers,
  updateTopper,
  deleteTopper,
  adminListToppers,
};
