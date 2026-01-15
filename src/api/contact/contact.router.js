const express = require("express");
const authMiddleware = require("../../middlewares/auth.middleware");
const contactController = require("./contact.controller");

const router = express.Router();

/**
 * @swagger
 * /apis/contact:
 *  post:
 *      summary: Submit contact us form (public)
 *      tags: [contact]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          email:
 *                              type: string
 *                          phone:
 *                              type: string
 *                          subject:
 *                              type: string
 *                          message:
 *                              type: string
 *                          source:
 *                              type: string
 *      responses:
 *          default:
 *              description: response
 */
router.post("/", contactController.submitContact);

/**
 * @swagger
 * /apis/contact/faq:
 *  get:
 *      summary: Get FAQs (public)
 *      tags: [contact]
 *      description: Returns list of frequently asked questions
 *      responses:
 *          200:
 *              description: List of FAQs
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
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          _id:
 *                                              type: string
 *                                          question:
 *                                              type: string
 *                                          answer:
 *                                              type: string
 *                                          order:
 *                                              type: integer
 *                                          isActive:
 *                                              type: boolean
 *                                          createdAt:
 *                                              type: string
 *                                          updatedAt:
 *                                              type: string
 */
router.get("/faq", contactController.getFAQs);

/**
 * @swagger
 * /apis/contact/admin:
 *  get:
 *      summary: List all contact submissions (admin)
 *      tags: [contact]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *          default:
 *              description: response
 */
router.get("/admin", authMiddleware, contactController.listContacts);

/**
 * @swagger
 * /apis/contact/admin/{id}/resolve:
 *  patch:
 *      summary: Mark contact as resolved (admin)
 *      tags: [contact]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          notes:
 *                              type: string
 *                              description: Optional notes about the resolution
 *      responses:
 *          default:
 *              description: response
 */
router.patch("/admin/:id/resolve", authMiddleware, contactController.markAsResolved);

/**
 * @swagger
 * /apis/contact/admin/faq:
 *  get:
 *      summary: List all FAQs including inactive (admin)
 *      tags: [contact]
 *      security:
 *        - bearerAuth: []
 *      description: Returns all FAQs including inactive ones, sorted by order
 *      responses:
 *          200:
 *              description: List of all FAQs
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
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          _id:
 *                                              type: string
 *                                          question:
 *                                              type: string
 *                                          answer:
 *                                              type: string
 *                                          order:
 *                                              type: integer
 *                                          isActive:
 *                                              type: boolean
 *                                          createdAt:
 *                                              type: string
 *                                          updatedAt:
 *                                              type: string
 */
router.get("/admin/faq", authMiddleware, contactController.listAllFAQs);

/**
 * @swagger
 * /apis/contact/admin/faq:
 *  post:
 *      summary: Create FAQ (admin)
 *      tags: [contact]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                        - question
 *                        - answer
 *                      properties:
 *                          question:
 *                              type: string
 *                          answer:
 *                              type: string
 *                          order:
 *                              type: integer
 *                              default: 0
 *                          isActive:
 *                              type: boolean
 *                              default: true
 *      responses:
 *          default:
 *              description: response
 */
router.post("/admin/faq", authMiddleware, contactController.createFAQ);

/**
 * @swagger
 * /apis/contact/admin/faq/{id}:
 *  patch:
 *      summary: Update FAQ (admin)
 *      tags: [contact]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          question:
 *                              type: string
 *                          answer:
 *                              type: string
 *                          order:
 *                              type: integer
 *                          isActive:
 *                              type: boolean
 *      responses:
 *          default:
 *              description: response
 */
router.patch("/admin/faq/:id", authMiddleware, contactController.updateFAQ);

module.exports = router;


