const express = require("express");
const authMiddleware = require("../../middlewares/auth.middleware");
const courseController = require("./course.controller");

const router = express.Router();

/**
 * @swagger
 * /apis/courses:
 *  get:
 *      summary: List active courses (public)
 *      tags: [courses]
 *      description: Returns list of active courses sorted by order asc
 *      responses:
 *          200:
 *              description: List of courses
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
 *                                          name:
 *                                              type: string
 *                                          slug:
 *                                              type: string
 *                                          description:
 *                                              type: string
 *                                          longDescription:
 *                                              type: string
 *                                          subject:
 *                                              type: string
 *                                          classLevel:
 *                                              type: string
 *                                          mode:
 *                                              type: string
 *                                          duration:
 *                                              type: string
 *                                          feeRange:
 *                                              type: string
 *                                          highlights:
 *                                              type: array
 *                                              items:
 *                                                  type: string
 *                                          coverImage:
 *                                              type: string
 *                                          enrollCtaText:
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
router.get("/", courseController.listCourses);

/**
 * @swagger
 * /apis/courses/admin/list:
 *  get:
 *      summary: List all courses (admin)
 *      tags: [courses]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *          default:
 *              description: response
 */
router.get("/admin/list", authMiddleware, courseController.adminListCourses);

/**
 * @swagger
 * /apis/courses/{slug}:
 *  get:
 *      summary: Get course by slug (public)
 *      tags: [courses]
 *      parameters:
 *        - in: path
 *          name: slug
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          default:
 *              description: response
 */
router.get("/:slug", courseController.getCourseBySlug);

/**
 * @swagger
 * /apis/courses/admin:
 *  post:
 *      summary: Create course (admin)
 *      tags: [courses]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                        - name
 *                      properties:
 *                          name:
 *                              type: string
 *                          slug:
 *                              type: string
 *                              description: Optional; auto-generated from name if omitted
 *                          description:
 *                              type: string
 *                          longDescription:
 *                              type: string
 *                              description: HTML body
 *                          subject:
 *                              type: string
 *                          classLevel:
 *                              type: string
 *                          mode:
 *                              type: string
 *                          duration:
 *                              type: string
 *                          feeRange:
 *                              type: string
 *                          highlights:
 *                              type: array
 *                              items:
 *                                  type: string
 *                          coverImage:
 *                              type: string
 *                          enrollCtaText:
 *                              type: string
 *                              default: "Book a Free Demo"
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
router.post("/admin", authMiddleware, courseController.createCourse);

/**
 * @swagger
 * /apis/courses/admin/{id}:
 *  patch:
 *      summary: Update course (admin)
 *      tags: [courses]
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
 *                          name:
 *                              type: string
 *                          slug:
 *                              type: string
 *                          description:
 *                              type: string
 *                          longDescription:
 *                              type: string
 *                          subject:
 *                              type: string
 *                          classLevel:
 *                              type: string
 *                          mode:
 *                              type: string
 *                          duration:
 *                              type: string
 *                          feeRange:
 *                              type: string
 *                          highlights:
 *                              type: array
 *                              items:
 *                                  type: string
 *                          coverImage:
 *                              type: string
 *                          enrollCtaText:
 *                              type: string
 *                          order:
 *                              type: integer
 *                          isActive:
 *                              type: boolean
 *      responses:
 *          default:
 *              description: response
 */
router.patch("/admin/:id", authMiddleware, courseController.updateCourse);

/**
 * @swagger
 * /apis/courses/admin/{id}:
 *  delete:
 *      summary: Delete course (admin)
 *      tags: [courses]
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
router.delete("/admin/:id", authMiddleware, courseController.deleteCourse);

module.exports = router;
