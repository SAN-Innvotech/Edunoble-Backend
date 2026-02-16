const responses = require("../../utility/responses");
const leadService = require("./lead.service");

const createLead = async (req, res) => {
  try {
    const { name, number, grade, subject } = req.body;
    if (!name || !number) {
      return responses.badRequestResponse(res, "name and number are required");
    }

    const payload = { name, number, grade, subject };
    const result = await leadService.createLead(payload);

    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }

    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("createLead controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const listLeads = async (req, res) => {
  try {
    const result = await leadService.listLeads();
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("listLeads controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const deleteLead = async (req, res) => {
  try {
    const result = await leadService.deleteLead(req.params.id);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("deleteLead controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

module.exports = {
  createLead,
  listLeads,
  deleteLead,
};
