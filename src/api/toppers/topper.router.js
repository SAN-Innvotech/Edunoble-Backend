const express = require("express");
const authMiddleware = require("../../middlewares/auth.middleware");
const topperController = require("./topper.controller");

const router = express.Router();

/**
 * @swagger
 * /apis/toppers:
 *  get:
 *      summary: List active toppers (public)
 *      tags: [toppers]
 *      description: Returns list of active toppers sorted by order asc
 *      responses:
 *          200:
 *              description: List of toppers
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
 *                                          studentName:
 *                                              type: string
 *                                          photo:
 *                                              type: string
 *                                          examName:
 *                                              type: string
 *                                          score:
 *                                              type: string
 *                                          year:
 *                                              type: string
 *                                          classLevel:
 *                                              type: string
 *                                          board:
 *                                              type: string
 *                                          achievement:
 *                                              type: string
 *                                          quote:
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
router.get("/", topperController.listToppers);

/**
 * @swagger
 * /apis/toppers/admin/list:
 *  get:
 *      summary: List all toppers (admin)
 *      tags: [toppers]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *          default:
 *              description: response
 */
router.get("/admin/list", authMiddleware, topperController.adminListToppers);

/**
 * @swagger
 * /apis/toppers/admin:
 *  post:
 *      summary: Create topper (admin)
 *      tags: [toppers]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                        - studentName
 *                      properties:
 *                          studentName:
 *                              type: string
 *                          photo:
 *                              type: string
 *                          examName:
 *                              type: string
 *                          score:
 *                              type: string
 *                          year:
 *                              type: string
 *                          classLevel:
 *                              type: string
 *                          board:
 *                              type: string
 *                          achievement:
 *                              type: string
 *                          quote:
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
router.post("/admin", authMiddleware, topperController.createTopper);

/**
 * @swagger
 * /apis/toppers/admin/{id}:
 *  patch:
 *      summary: Update topper (admin)
 *      tags: [toppers]
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
 *                          studentName:
 *                              type: string
 *                          photo:
 *                              type: string
 *                          examName:
 *                              type: string
 *                          score:
 *                              type: string
 *                          year:
 *                              type: string
 *                          classLevel:
 *                              type: string
 *                          board:
 *                              type: string
 *                          achievement:
 *                              type: string
 *                          quote:
 *                              type: string
 *                          order:
 *                              type: integer
 *                          isActive:
 *                              type: boolean
 *      responses:
 *          default:
 *              description: response
 */
router.patch("/admin/:id", authMiddleware, topperController.updateTopper);

/**
 * @swagger
 * /apis/toppers/admin/{id}:
 *  delete:
 *      summary: Delete topper (admin)
 *      tags: [toppers]
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
router.delete("/admin/:id", authMiddleware, topperController.deleteTopper);

module.exports = router;
