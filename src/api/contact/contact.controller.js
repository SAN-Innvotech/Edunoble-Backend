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

module.exports = {
  submitContact,
  listContacts,
  getFAQs,
  markAsResolved,
};


