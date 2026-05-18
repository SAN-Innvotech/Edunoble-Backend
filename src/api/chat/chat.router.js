const express = require("express");
const chatController = require("./chat.controller");

const router = express.Router();

/**
 * @swagger
 * /apis/chat:
 *  post:
 *      summary: AI chatbot reply (public)
 *      tags: [chat]
 *      description: Sends the conversation to Google Gemini and returns the assistant's reply
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                        - messages
 *                      properties:
 *                          messages:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      role:
 *                                          type: string
 *                                          enum: [user, assistant]
 *                                      content:
 *                                          type: string
 *      responses:
 *          200:
 *              description: Assistant reply
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
 *                                      reply:
 *                                          type: string
 */
router.post("/", chatController.chat);

module.exports = router;
