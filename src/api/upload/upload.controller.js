const responses = require("../../utility/responses");
const { uploadToCloudinary } = require("../../utility/uploadToCloudinary");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return responses.badRequestResponse(res, "Image file is required");
    }

    // Optional folder parameter from query string (default: "uploads")
    const folder = req.query.folder || "uploads";

    const uploadResult = await uploadToCloudinary(
      req.file.buffer,
      `${Date.now()}-${req.file.originalname}`,
      folder
    );

    return responses.successResponse(res, { imageUrl: uploadResult.secure_url });
  } catch (error) {
    console.error("uploadImage error", error);
    return responses.internalFailureResponse(res, error);
  }
};

module.exports = {
  uploadImage,
};
