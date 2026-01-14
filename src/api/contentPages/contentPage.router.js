const express = require("express");
const authMiddleware = require("../../middlewares/auth.middleware");
const contentPageController = require("./contentPage.controller");

const router = express.Router();

/**
 * @swagger
 * /apis/content-pages/admin/list:
 *  get:
 *      summary: List all content pages (admin)
 *      tags: [contentPages]
 *      security:
 *        - bearerAuth: []
 *      description: Returns all content pages including inactive ones
 *      responses:
 *          200:
 *              description: List of all content pages
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
 */
router.get("/admin/list", authMiddleware, contentPageController.listContentPages);

/**
 * @swagger
 * /apis/content-pages/{type}:
 *  get:
 *      summary: Get content page by type (public)
 *      tags: [contentPages]
 *      description: Returns active content page for the specified type (about or vision)
 *      parameters:
 *        - in: path
 *          name: type
 *          required: true
 *          schema:
 *            type: string
 *            enum: [about, vision]
 *          description: Type of content page
 *      responses:
 *          200:
 *              description: Content page data
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
 *                                      _id:
 *                                          type: string
 *                                      title:
 *                                          type: string
 *                                      content:
 *                                          type: string
 *                                      pictureUrl:
 *                                          type: string
 *                                      type:
 *                                          type: string
 *                                          enum: [about, vision]
 *                                      order:
 *                                          type: integer
 *                                      isActive:
 *                                          type: boolean
 *                                      createdAt:
 *                                          type: string
 *                                      updatedAt:
 *                                          type: string
 *          404:
 *              description: Content page not found
 */
router.get("/:type", contentPageController.getContentPage);

/**
 * @swagger
 * /apis/content-pages/admin:
 *  post:
 *      summary: Create content page (admin)
 *      tags: [contentPages]
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
 *                        - content
 *                        - type
 *                      properties:
 *                          title:
 *                              type: string
 *                          content:
 *                              type: string
 *                          pictureUrl:
 *                              type: string
 *                              description: Optional image URL
 *                          type:
 *                              type: string
 *                              enum: [about, vision]
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
router.post("/admin", authMiddleware, contentPageController.createContentPage);

/**
 * @swagger
 * /apis/content-pages/admin/{id}:
 *  patch:
 *      summary: Update content page (admin)
 *      tags: [contentPages]
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
 *                          content:
 *                              type: string
 *                          pictureUrl:
 *                              type: string
 *                          type:
 *                              type: string
 *                              enum: [about, vision]
 *                          order:
 *                              type: integer
 *                          isActive:
 *                              type: boolean
 *      responses:
 *          default:
 *              description: response
 */
router.patch("/admin/:id", authMiddleware, contentPageController.updateContentPage);

/**
 * @swagger
 * /apis/content-pages/admin/{id}:
 *  delete:
 *      summary: Delete content page (admin)
 *      tags: [contentPages]
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
router.delete("/admin/:id", authMiddleware, contentPageController.deleteContentPage);

module.exports = router;
