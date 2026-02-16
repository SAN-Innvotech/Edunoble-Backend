const express = require("express");
const authMiddleware = require("../../middlewares/auth.middleware");
const leadController = require("./lead.controller");

const router = express.Router();

/**
 * @swagger
 * /apis/leads:
 *  post:
 *      summary: Create a new lead (public)
 *      tags: [leads]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                        - name
 *                        - number
 *                      properties:
 *                          name:
 *                              type: string
 *                          number:
 *                              type: string
 *                          grade:
 *                              type: string
 *                          subject:
 *                              type: string
 *      responses:
 *          default:
 *              description: response
 */
router.post("/", leadController.createLead);

/**
 * @swagger
 * /apis/leads/admin:
 *  get:
 *      summary: List all leads (admin)
 *      tags: [leads]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *          default:
 *              description: response
 */
router.get("/admin", authMiddleware, leadController.listLeads);

/**
 * @swagger
 * /apis/leads/admin/{id}:
 *  delete:
 *      summary: Delete a lead (admin)
 *      tags: [leads]
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
router.delete("/admin/:id", authMiddleware, leadController.deleteLead);

module.exports = router;
