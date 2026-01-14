const responses = require("../../utility/responses");
const contentPageService = require("./contentPage.service");

const createContentPage = async (req, res) => {
  try {
    const { title, content, pictureUrl, type, order, isActive } = req.body;

    if (!title || !content || !type) {
      return responses.badRequestResponse(res, "title, content, and type are required");
    }

    if (!["about", "vision"].includes(type)) {
      return responses.badRequestResponse(res, "type must be either 'about' or 'vision'");
    }

    const payload = {
      title,
      content,
      pictureUrl,
      type,
      order: order ? Number(order) : 0,
      isActive: isActive !== undefined ? isActive : true,
    };

    const result = await contentPageService.createContentPage(payload);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }

    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("createContentPage controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const listContentPages = async (req, res) => {
  try {
    const result = await contentPageService.listContentPages();
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("listContentPages controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const getContentPage = async (req, res) => {
  try {
    const { type } = req.params;
   
    if (!["about", "vision"].includes(type)) {
      return responses.badRequestResponse(res, "type must be either 'about' or 'vision'");
    }

    const result = await contentPageService.getContentPage(type);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("getContentPage controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const updateContentPage = async (req, res) => {
  try {
    const result = await contentPageService.updateContentPage(req.params.id, req.body);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("updateContentPage controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const deleteContentPage = async (req, res) => {
  try {
    const result = await contentPageService.deleteContentPage(req.params.id);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("deleteContentPage controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

module.exports = {
  createContentPage,
  listContentPages,
  getContentPage,
  updateContentPage,
  deleteContentPage,
};
