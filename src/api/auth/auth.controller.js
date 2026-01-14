const responses = require("../../utility/responses");
const authService = require("./auth.service");

const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }

    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("register error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }

    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("login error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const sendAdminOtp = async (req, res) => {
  try {
    const result = await authService.sendAdminOtp(req.body);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }

    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("sendAdminOtp error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const verifyAdminOtp = async (req, res) => {
  try {
    const result = await authService.verifyAdminOtp(req.body);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }

    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("verifyAdminOtp error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const changePassword = async (req, res) => {
  try {
    const result = await authService.changePassword(req.user.id, req.body);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }

    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("changePassword error", err);
    return responses.internalFailureResponse(res, err);
  }
};

module.exports = {
  register,
  login,
  sendAdminOtp,
  verifyAdminOtp,
  changePassword,
};
