const express = require("express");
const authMiddleware = require("../../middlewares/auth.middleware");
const testimonialController = require("./testimonial.controller");

const router = express.Router();

/**
 * @swagger
 * /apis/testimonials:
 *  get:
 *      summary: List active testimonials (public)
 *      tags: [testimonials]
 *      description: Returns list of active testimonials sorted by order
 *      responses:
 *          200:
 *              description: List of testimonials
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
 *                                          heading:
 *                                              type: string
 *                                              example: "Helps reduce exam anxiety"
 *                                          quote:
 *                                              type: string
 *                                          authorName:
 *                                              type: string
 *                                              example: "Riya"
 *                                          authorClass:
 *                                              type: string
 *                                              example: "Class 12 Science"
 *                                          authorDetails:
 *                                              type: string
 *                                              example: "Class 12 • PCM"
 *                                          order:
 *                                              type: integer
 *                                          isActive:
 *                                              type: boolean
 *                                          createdAt:
 *                                              type: string
 *                                          updatedAt:
 *                                              type: string
 */
router.get("/", testimonialController.listTestimonials);

/**
 * @swagger
 * /apis/testimonials/admin:
 *  get:
 *      summary: List all testimonials (admin)
 *      tags: [testimonials]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *          default:
 *              description: response
 */
router.get("/admin/list", authMiddleware, testimonialController.adminListTestimonials);

/**
 * @swagger
 * /apis/testimonials/{id}:
 *  get:
 *      summary: Get testimonial by id (public)
 *      tags: [testimonials]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          default:
 *              description: response
 */
router.get("/:id", testimonialController.getTestimonialById);

/**
 * @swagger
 * /apis/testimonials/admin:
 *  post:
 *      summary: Create testimonial (admin)
 *      tags: [testimonials]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                        - heading
 *                        - quote
 *                        - authorName
 *                        - authorClass
 *                      properties:
 *                          heading:
 *                              type: string
 *                              example: "Helps reduce exam anxiety"
 *                          quote:
 *                              type: string
 *                          authorName:
 *                              type: string
 *                              example: "Riya"
 *                          authorClass:
 *                              type: string
 *                              example: "Class 12 Science"
 *                          authorDetails:
 *                              type: string
 *                              example: "Class 12 • PCM"
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
router.post("/admin", authMiddleware, testimonialController.createTestimonial);

/**
 * @swagger
 * /apis/testimonials/admin/{id}:
 *  patch:
 *      summary: Update testimonial (admin)
 *      tags: [testimonials]
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
 *                          heading:
 *                              type: string
 *                          quote:
 *                              type: string
 *                          authorName:
 *                              type: string
 *                          authorClass:
 *                              type: string
 *                          authorDetails:
 *                              type: string
 *                          order:
 *                              type: integer
 *                          isActive:
 *                              type: boolean
 *      responses:
 *          default:
 *              description: response
 */
router.patch("/admin/:id", authMiddleware, testimonialController.updateTestimonial);

/**
 * @swagger
 * /apis/testimonials/admin/{id}:
 *  delete:
 *      summary: Delete testimonial (admin)
 *      tags: [testimonials]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          default:
 *              description: response
 */
router.delete("/admin/:id", authMiddleware, testimonialController.deleteTestimonial);

module.exports = router;

