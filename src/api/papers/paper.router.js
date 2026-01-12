const express = require("express");
const authMiddleware = require("../../middlewares/auth.middleware");
const paperController = require("./paper.controller");

const router = express.Router();

/**
 * @swagger
 * /apis/papers/metadata:
 *  get:
 *      summary: Get metadata (unique values for filters) (public)
 *      tags: [papers]
 *      description: Returns arrays of objects with name and count for class, subject, board, year, and examType from all active papers
 *      responses:
 *          200:
 *              description: Metadata object with arrays of objects containing name and count
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              classes:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          name:
 *                                              type: string
 *                                          count:
 *                                              type: integer
 *                              subjects:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          name:
 *                                              type: string
 *                                          count:
 *                                              type: integer
 *                              boards:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          name:
 *                                              type: string
 *                                          count:
 *                                              type: integer
 *                              years:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          name:
 *                                              type: integer
 *                                          count:
 *                                              type: integer
 *                              examTypes:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          name:
 *                                              type: string
 *                                          count:
 *                                              type: integer
 */
router.get("/metadata", paperController.getMetadata);

/**
 * @swagger
 * /apis/papers/subjects-by-class:
 *  get:
 *      summary: Get top 6 subjects grouped by class with paper counts (public)
 *      tags: [papers]
 *      description: Returns top 6 subjects grouped by class with paper counts, sorted by paper count in descending order
 *      responses:
 *          200:
 *              description: Array of top 6 objects with class, subject, and paperCount
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
 *                                  maxItems: 6
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          class:
 *                                              type: string
 *                                              example: "10th"
 *                                          subject:
 *                                              type: string
 *                                              example: "Maths"
 *                                          paperCount:
 *                                              type: integer
 *                                              example: 20
 */
router.get("/subjects-by-class", paperController.getSubjectsByClass);

/**
 * @swagger
 * /apis/papers/featured:
 *  get:
 *      summary: List featured sample papers (public)
 *      tags: [papers]
 *      parameters:
 *        - in: query
 *          name: class
 *          schema:
 *            type: string
 *          description: Optional class filter
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            default: 12
 *            maximum: 50
 *          description: Maximum number of featured papers to return
 *      responses:
 *          200:
 *              description: List of featured papers
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
router.get("/featured", paperController.getFeaturedPapers);

/**
 * @swagger
 * /apis/papers:
 *  get:
 *      summary: List sample papers with pagination and sorting (public)
 *      tags: [papers]
 *      parameters:
 *        - in: query
 *          name: class
 *          schema:
 *            type: string
 *          description: Filter by class
 *        - in: query
 *          name: subject
 *          schema:
 *            type: string
 *          description: Filter by subject
 *        - in: query
 *          name: year
 *          schema:
 *            type: integer
 *          description: Filter by year
 *        - in: query
 *          name: board
 *          schema:
 *            type: string
 *          description: Filter by board
 *        - in: query
 *          name: examType
 *          schema:
 *            type: string
 *          description: Filter by exam type
 *        - in: query
 *          name: search
 *          schema:
 *            type: string
 *          description: Free-text search across title, subject, description, board, examType
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            default: 20
 *            maximum: 100
 *          description: Number of items per page (max 100)
 *        - in: query
 *          name: offset
 *          schema:
 *            type: integer
 *            default: 0
 *            minimum: 0
 *          description: Number of items to skip
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *            enum: [default, year-newest, year-oldest, class-asc, class-desc, subject-asc, subject-desc]
 *            default: default
 *          description: Sort order
 *      responses:
 *          200:
 *              description: Paginated list of papers
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
 *                                      items:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                      pagination:
 *                                          type: object
 *                                          properties:
 *                                              total:
 *                                                  type: integer
 *                                              offset:
 *                                                  type: integer
 */
router.get("/", paperController.getPapers);

/**
 * @swagger
 * /apis/papers/{id}/view:
 *  patch:
 *      summary: Increment view count for a paper (public)
 *      tags: [papers]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Paper ID
 *      responses:
 *          200:
 *              description: View count incremented successfully
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
 *                                      viewCount:
 *                                          type: integer
 *                                          description: Updated view count
 *          404:
 *              description: Paper not found
 */
router.patch("/:id/view", paperController.incrementViewCount);

/**
 * @swagger
 * /apis/papers/{id}:
 *  get:
 *      summary: Get paper by id (public)
 *      tags: [papers]
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
router.get("/:id", paperController.getPaperById);

/**
 * @swagger
 * /apis/papers/admin/dashboard:
 *  get:
 *      summary: Get dashboard analytics (admin)
 *      tags: [papers]
 *      security:
 *        - bearerAuth: []
 *      description: Returns comprehensive dashboard analytics including total views, top papers, and statistics across all models
 *      responses:
 *          200:
 *              description: Dashboard analytics data
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
 *                                      totalViews:
 *                                          type: integer
 *                                          description: Total views across all papers
 *                                      topPapers:
 *                                          type: array
 *                                          description: Top 5 papers by view count
 *                                          items:
 *                                              type: object
 *                                      papers:
 *                                          type: object
 *                                          properties:
 *                                              total:
 *                                                  type: integer
 *                                              active:
 *                                                  type: integer
 *                                              inactive:
 *                                                  type: integer
 *                                              featured:
 *                                                  type: integer
 *                                      testimonials:
 *                                          type: object
 *                                      contacts:
 *                                          type: object
 *                                      users:
 *                                          type: object
 *                                      faqs:
 *                                          type: object
 *                                      recentPapers:
 *                                          type: array
 *                                          description: Last 5 created papers
 *                                      distribution:
 *                                          type: object
 *                                          properties:
 *                                              byClass:
 *                                                  type: array
 *                                              bySubject:
 *                                                  type: array
 */
router.get("/admin/dashboard", authMiddleware, paperController.getDashboardAnalytics);

/**
 * @swagger
 * /apis/papers/admin/list:
 *  get:
 *      summary: List all papers with pagination and sorting (admin)
 *      tags: [papers]
 *      security:
 *        - bearerAuth: []
 *      description: Returns all papers (including inactive) with same filtering, pagination, and sorting as public endpoint
 *      parameters:
 *        - in: query
 *          name: class
 *          schema:
 *            type: string
 *          description: Filter by class
 *        - in: query
 *          name: subject
 *          schema:
 *            type: string
 *          description: Filter by subject
 *        - in: query
 *          name: year
 *          schema:
 *            type: integer
 *          description: Filter by year
 *        - in: query
 *          name: board
 *          schema:
 *            type: string
 *          description: Filter by board
 *        - in: query
 *          name: examType
 *          schema:
 *            type: string
 *          description: Filter by exam type
 *        - in: query
 *          name: search
 *          schema:
 *            type: string
 *          description: Free-text search across title, subject, description, board, examType
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            default: 20
 *            maximum: 100
 *          description: Number of items per page (max 100)
 *        - in: query
 *          name: offset
 *          schema:
 *            type: integer
 *            default: 0
 *            minimum: 0
 *          description: Number of items to skip
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *            enum: [default, year-newest, year-oldest, class-asc, class-desc, subject-asc, subject-desc]
 *            default: default
 *          description: Sort order
 *      responses:
 *          200:
 *              description: Paginated list of all papers
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
 *                                      items:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                      pagination:
 *                                          type: object
 *                                          properties:
 *                                              total:
 *                                                  type: integer
 *                                              offset:
 *                                                  type: integer
 */
router.get("/admin/list", authMiddleware, paperController.adminListPapers);

/**
 * @swagger
 * /apis/papers/admin:
 *  post:
 *      summary: Create sample paper (admin)
 *      tags: [papers]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          fileUrl:
 *                              type: string
 *                              description: Direct URL to the file
 *                          title:
 *                              type: string
 *                          class:
 *                              type: string
 *                          subject:
 *                              type: string
 *                          year:
 *                              type: integer
 *                          description:
 *                              type: string
 *                          board:
 *                              type: string
 *                          examType:
 *                              type: string
 *                          tags:
 *                              type: string
 *                              description: Comma separated tags
 *      responses:
 *          default:
 *              description: response
 */
router.post("/admin", authMiddleware, paperController.createPaper);

/**
 * @swagger
 * /apis/papers/admin/{id}:
 *  patch:
 *      summary: Update paper meta-data (admin)
 *      tags: [papers]
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
 *      responses:
 *          default:
 *              description: response
 */
router.patch("/admin/:id", authMiddleware, paperController.updatePaper);

/**
 * @swagger
 * /apis/papers/admin/{id}:
 *  delete:
 *      summary: Delete paper (admin)
 *      tags: [papers]
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
router.delete("/admin/:id", authMiddleware, paperController.deletePaper);

module.exports = router;


