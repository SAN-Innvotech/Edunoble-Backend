const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

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

/**
 * @swagger
 * /apis/auth/change-password:
 *  post:
 *      summary: Change password (authenticated)
 *      tags: [auth]
 *      security:
 *        - bearerAuth: []
 *      description: Updates password for the authenticated user. Uses userId from token.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                        - newPassword
 *                      properties:
 *                          newPassword:
 *                              type: string
 *      responses:
 *          200:
 *              description: Password changed successfully
 *          400:
 *              description: Missing newPassword
 *          401:
 *              description: Invalid token
 *          404:
 *              description: User not found
 */
router.post("/change-password", authMiddleware, authController.changePassword);

/**
 * @swagger
 * /apis/auth/admin/send-otp:
 *  post:
 *      summary: Send OTP to admin email
 *      tags: [auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: Admin email to send OTP to
 *      responses:
 *          200:
 *              description: OTP sent successfully
 *          400:
 *              description: Missing or invalid email
 *          404:
 *              description: User not found
 */
router.post("/admin/send-otp", authController.sendAdminOtp);

/**
 * @swagger
 * /apis/auth/admin/verify-otp:
 *  post:
 *      summary: Verify admin OTP and login
 *      tags: [auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          otp:
 *                              type: string
 *      responses:
 *          200:
 *              description: OTP verified, returns same response as login
 *          400:
 *              description: Missing email or otp
 *          401:
 *              description: Invalid or expired OTP
 */
router.post("/admin/verify-otp", authController.verifyAdminOtp);

module.exports = router;
