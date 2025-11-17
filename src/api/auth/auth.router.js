const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");

/**
 * @swagger
 * /apis/auth/register:
 *  post:
 *      summary: User registration
 *      tags: [auth]
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
 *                          password:
 *                              type: string
 *      responses:
 *          default:
 *              description: response
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /apis/auth/login:
 *  post:
 *      summary: User login
 *      tags: [auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          emailOrPhone:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          default:
 *              description: response
 */
router.post("/login", authController.login);

module.exports = router;
