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

module.exports = {
  register,
  login,
};
