const express = require("express");
const authMiddleware = require("../../middlewares/auth.middleware");
const homepageController = require("./homepage.controller");

const router = express.Router();

/**
 * @swagger
 * /apis/homepage:
 *  get:
 *      summary: Get active homepage content (public)
 *      tags: [homepage]
 *      description: Returns the active homepage content
 *      responses:
 *          200:
 *              description: Homepage content
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
 *                                      hero:
 *                                          type: object
 *                                      statistics:
 *                                          type: array
 *                                      features:
 *                                          type: object
 *                                      process:
 *                                          type: object
 *                                      isActive:
 *                                          type: boolean
 *                                      createdAt:
 *                                          type: string
 *                                      updatedAt:
 *                                          type: string
 *          404:
 *              description: Homepage not found
 */
router.get("/", homepageController.getHomepage);

/**
 * @swagger
 * /apis/homepage/admin:
 *  post:
 *      summary: Create homepage content (admin)
 *      tags: [homepage]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                        - hero
 *                        - statistics
 *                        - features
 *                        - process
 *                        - mostViewedPapers
 *                        - featuredPapers
 *                        - studentsSay
 *                      properties:
 *                          hero:
 *                              type: object
 *                              required:
 *                                - headline
 *                                - description
 *                                - features
 *                                - samplePaperCount
 *                                - studentReview
 *                              properties:
 *                                  headline:
 *                                      type: string
 *                                  subheading:
 *                                      type: string
 *                                  description:
 *                                      type: string
 *                                  logo:
 *                                      type: string
 *                                  pictureUrl1:
 *                                      type: string
 *                                  pictureUrl2:
 *                                      type: string
 *                                  pictureUrl3:
 *                                      type: string
 *                                  features:
 *                                      type: object
 *                                      required:
 *                                        - feature1
 *                                        - feature2
 *                                        - feature3
 *                                      properties:
 *                                          feature1:
 *                                              type: string
 *                                          feature2:
 *                                              type: string
 *                                          feature3:
 *                                              type: string
 *                                  samplePaperCount:
 *                                      type: string
 *                                  studentReview:
 *                                      type: object
 *                                      required:
 *                                        - name
 *                                        - class
 *                                      properties:
 *                                          name:
 *                                              type: string
 *                                          class:
 *                                              type: string
 *                                          imageUrl:
 *                                              type: string
 *                          mostViewedPapers:
 *                              type: object
 *                              required:
 *                                - heading
 *                                - description
 *                              properties:
 *                                  heading:
 *                                      type: string
 *                                  description:
 *                                      type: string
 *                          featuredPapers:
 *                              type: object
 *                              required:
 *                                - heading
 *                                - description
 *                              properties:
 *                                  heading:
 *                                      type: string
 *                                  description:
 *                                      type: string
 *                          studentsSay:
 *                              type: object
 *                              required:
 *                                - heading
 *                                - description
 *                              properties:
 *                                  heading:
 *                                      type: string
 *                                  description:
 *                                      type: string
 *                          statistics:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  required:
 *                                    - number
 *                                    - label
 *                                  properties:
 *                                      number:
 *                                          type: string
 *                                      label:
 *                                          type: string
 *                                      order:
 *                                          type: integer
 *                          features:
 *                              type: object
 *                              required:
 *                                - heading
 *                                - description
 *                                - featureList
 *                              properties:
 *                                  heading:
 *                                      type: string
 *                                  description:
 *                                      type: string
 *                                  featureList:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          required:
 *                                            - text
 *                                          properties:
 *                                              text:
 *                                                  type: string
 *                                  ctaButtonText:
 *                                      type: string
 *                                  imageUrl:
 *                                      type: string
 *                          process:
 *                              type: object
 *                              required:
 *                                - heading
 *                                - subtitle
 *                                - steps
 *                              properties:
 *                                  heading:
 *                                      type: string
 *                                  subtitle:
 *                                      type: string
 *                                  steps:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          required:
 *                                            - stepNumber
 *                                            - title
 *                                            - description
 *                                          properties:
 *                                              stepNumber:
 *                                                  type: string
 *                                              title:
 *                                                  type: string
 *                                              description:
 *                                                  type: string
 *                                              order:
 *                                                  type: integer
 *                          isActive:
 *                              type: boolean
 *      responses:
 *          200:
 *              description: Homepage created successfully
 *          400:
 *              description: Bad request - Missing required fields
 */
router.post("/admin", authMiddleware, homepageController.createHomepage);

/**
 * @swagger
 * /apis/homepage/admin/{id}/section/{section}:
 *  patch:
 *      summary: Update specific homepage section (admin)
 *      tags: [homepage]
 *      security:
 *        - bearerAuth: []
 *      description: Update a specific section of the homepage. Valid sections are hero, statistics, features, process, mostViewedPapers, featuredPapers, studentsSay
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Homepage ID
 *        - in: path
 *          name: section
 *          required: true
 *          schema:
 *            type: string
 *            enum: [hero, statistics, features, process, mostViewedPapers, featuredPapers, studentsSay]
 *          description: Section to update
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      description: Send only the data for the specific section you want to update
 *                      example:
 *                          headline: "Practice Sample Papers"
 *                          subheading: "for Class 8, 9, 10, 11 & 12"
 *                          description: "Access high-quality sample papers..."
 *                          logo: "https://example.com/logo.png"
 *      responses:
 *          200:
 *              description: Section updated successfully
 *          400:
 *              description: Invalid section name
 *          404:
 *              description: Homepage not found
 */
router.patch("/admin/:id/section/:section", authMiddleware, homepageController.updateHomepageSection);

/**
 * @swagger
 * /apis/homepage/admin/{id}:
 *  patch:
 *      summary: Update homepage content (admin)
 *      tags: [homepage]
 *      security:
 *        - bearerAuth: []
 *      description: Update any section(s) of the homepage. You can send partial updates - only include the sections you want to update.
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
 *                          hero:
 *                              type: object
 *                              properties:
 *                                  headline:
 *                                      type: string
 *                                  subheading:
 *                                      type: string
 *                                  description:
 *                                      type: string
 *                                  logo:
 *                                      type: string
 *                                  pictureUrl1:
 *                                      type: string
 *                                  pictureUrl2:
 *                                      type: string
 *                                  pictureUrl3:
 *                                      type: string
 *                                  features:
 *                                      type: object
 *                                      properties:
 *                                          feature1:
 *                                              type: string
 *                                          feature2:
 *                                              type: string
 *                                          feature3:
 *                                              type: string
 *                                  samplePaperCount:
 *                                      type: string
 *                                  studentReview:
 *                                      type: object
 *                                      properties:
 *                                          name:
 *                                              type: string
 *                                          class:
 *                                              type: string
 *                                          imageUrl:
 *                                              type: string
 *                          mostViewedPapers:
 *                              type: object
 *                              properties:
 *                                  heading:
 *                                      type: string
 *                                  description:
 *                                      type: string
 *                          featuredPapers:
 *                              type: object
 *                              properties:
 *                                  heading:
 *                                      type: string
 *                                  description:
 *                                      type: string
 *                          studentsSay:
 *                              type: object
 *                              properties:
 *                                  heading:
 *                                      type: string
 *                                  description:
 *                                      type: string
 *                          statistics:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      number:
 *                                          type: string
 *                                      label:
 *                                          type: string
 *                                      order:
 *                                          type: integer
 *                          features:
 *                              type: object
 *                              properties:
 *                                  heading:
 *                                      type: string
 *                                  description:
 *                                      type: string
 *                                  featureList:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              text:
 *                                                  type: string
 *                                  ctaButtonText:
 *                                      type: string
 *                                  imageUrl:
 *                                      type: string
 *                          process:
 *                              type: object
 *                              properties:
 *                                  heading:
 *                                      type: string
 *                                  subtitle:
 *                                      type: string
 *                                  steps:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              stepNumber:
 *                                                  type: string
 *                                              title:
 *                                                  type: string
 *                                              description:
 *                                                  type: string
 *                                              order:
 *                                                  type: integer
 *                          isActive:
 *                              type: boolean
 *      responses:
 *          200:
 *              description: Homepage updated successfully
 *          404:
 *              description: Homepage not found
 */
router.patch("/admin/:id", authMiddleware, homepageController.updateHomepage);

/**
 * @swagger
 * /apis/homepage/admin/{id}:
 *  delete:
 *      summary: Delete homepage content (admin)
 *      tags: [homepage]
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
router.delete("/admin/:id", authMiddleware, homepageController.deleteHomepage);

module.exports = router;
