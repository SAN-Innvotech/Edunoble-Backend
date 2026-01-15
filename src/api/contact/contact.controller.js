const responses = require("../../utility/responses");
const contactService = require("./contact.service");

const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message, source } = req.body;

    if (!name || !message) {
      return responses.badRequestResponse(res, "name and message are required");
    }

    const result = await contactService.createContact({
      name,
      email,
      phone,
      subject,
      message,
      source,
    });

    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }

    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("submitContact controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const listContacts = async (req, res) => {
  try {
    const result = await contactService.listContacts();

    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }

    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("listContacts controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const getFAQs = async (req, res) => {
  try {
    const result = await contactService.getFAQs();

    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }

    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("getFAQs controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const markAsResolved = async (req, res) => {
  try {
    const { notes } = req.body;
    const result = await contactService.markAsResolved(req.params.id, notes);

    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }

    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("markAsResolved controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const listAllFAQs = async (req, res) => {
  try {
    const result = await contactService.listAllFAQs();
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("listAllFAQs controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const createFAQ = async (req, res) => {
  try {
    const { question, answer, order, isActive } = req.body;

    if (!question || !answer) {
      return responses.badRequestResponse(res, "question and answer are required");
    }

    const payload = {
      question,
      answer,
      order: order ? Number(order) : 0,
      isActive: isActive !== undefined ? isActive : true,
    };

    const result = await contactService.createFAQ(payload);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }

    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("createFAQ controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const updateFAQ = async (req, res) => {
  try {
    const result = await contactService.updateFAQ(req.params.id, req.body);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("updateFAQ controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

module.exports = {
  submitContact,
  listContacts,
  getFAQs,
  markAsResolved,
  listAllFAQs,
  createFAQ,
  updateFAQ,
};


