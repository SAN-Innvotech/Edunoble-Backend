const express = require("express");
const authMiddleware = require("../../middlewares/auth.middleware");
const blogController = require("./blog.controller");

const router = express.Router();

/**
 * @swagger
 * /apis/blogs:
 *  get:
 *      summary: List active published blogs (public)
 *      tags: [blogs]
 *      description: Returns list of active, published blogs sorted by publishedAt desc
 *      responses:
 *          200:
 *              description: List of blogs
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
 *                                          title:
 *                                              type: string
 *                                          slug:
 *                                              type: string
 *                                          excerpt:
 *                                              type: string
 *                                          content:
 *                                              type: string
 *                                          coverImage:
 *                                              type: string
 *                                          author:
 *                                              type: string
 *                                          category:
 *                                              type: string
 *                                          tags:
 *                                              type: array
 *                                              items:
 *                                                  type: string
 *                                          isPublished:
 *                                              type: boolean
 *                                          publishedAt:
 *                                              type: string
 *                                          viewCount:
 *                                              type: integer
 *                                          order:
 *                                              type: integer
 *                                          isActive:
 *                                              type: boolean
 *                                          createdAt:
 *                                              type: string
 *                                          updatedAt:
 *                                              type: string
 */
router.get("/", blogController.listBlogs);

/**
 * @swagger
 * /apis/blogs/admin/list:
 *  get:
 *      summary: List all blogs (admin)
 *      tags: [blogs]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *          default:
 *              description: response
 */
router.get("/admin/list", authMiddleware, blogController.adminListBlogs);

/**
 * @swagger
 * /apis/blogs/{slug}:
 *  get:
 *      summary: Get blog by slug (public, increments viewCount)
 *      tags: [blogs]
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
router.get("/:slug", blogController.getBlogBySlug);

/**
 * @swagger
 * /apis/blogs/admin:
 *  post:
 *      summary: Create blog (admin)
 *      tags: [blogs]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                        - title
 *                      properties:
 *                          title:
 *                              type: string
 *                          slug:
 *                              type: string
 *                              description: Optional; auto-generated from title if omitted
 *                          excerpt:
 *                              type: string
 *                          content:
 *                              type: string
 *                              description: HTML body
 *                          coverImage:
 *                              type: string
 *                          author:
 *                              type: string
 *                              default: "EduNoble Team"
 *                          category:
 *                              type: string
 *                              default: "General"
 *                          tags:
 *                              type: array
 *                              items:
 *                                  type: string
 *                          isPublished:
 *                              type: boolean
 *                              default: true
 *                          publishedAt:
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
router.post("/admin", authMiddleware, blogController.createBlog);

/**
 * @swagger
 * /apis/blogs/admin/{id}:
 *  patch:
 *      summary: Update blog (admin)
 *      tags: [blogs]
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
 *                          title:
 *                              type: string
 *                          slug:
 *                              type: string
 *                          excerpt:
 *                              type: string
 *                          content:
 *                              type: string
 *                          coverImage:
 *                              type: string
 *                          author:
 *                              type: string
 *                          category:
 *                              type: string
 *                          tags:
 *                              type: array
 *                              items:
 *                                  type: string
 *                          isPublished:
 *                              type: boolean
 *                          publishedAt:
 *                              type: string
 *                          order:
 *                              type: integer
 *                          isActive:
 *                              type: boolean
 *      responses:
 *          default:
 *              description: response
 */
router.patch("/admin/:id", authMiddleware, blogController.updateBlog);

/**
 * @swagger
 * /apis/blogs/admin/{id}:
 *  delete:
 *      summary: Delete blog (admin)
 *      tags: [blogs]
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
router.delete("/admin/:id", authMiddleware, blogController.deleteBlog);

module.exports = router;
