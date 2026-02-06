const express = require("express");
const authMiddleware = require("../../middlewares/auth.middleware");
const { uploadSingle } = require("../../middlewares/upload");
const uploadController = require("./upload.controller");

const router = express.Router();

/**
 * @swagger
 * /apis/upload/image:
 *  post:
 *      summary: Upload an image (admin only)
 *      tags: [upload]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: folder
 *          schema:
 *            type: string
 *          description: Optional folder name in Cloudinary (default is "uploads")
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          image:
 *                              type: string
 *                              format: binary
 *                              description: Image file to upload
 *      responses:
 *          200:
 *              description: Image uploaded successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              isSuccess:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                              code:
 *                                  type: integer
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      imageUrl:
 *                                          type: string
 *                                          description: URL of the uploaded image
 *          400:
 *              description: Bad request - Image file is required
 *          401:
 *              description: Unauthorized - Invalid or missing token
 */
router.post("/image", authMiddleware, uploadSingle, uploadController.uploadImage);

module.exports = router;
