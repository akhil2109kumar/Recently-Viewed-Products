const express = require("express");
const { logProductView, fetchRecentlyViewed } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const validateParams = require("../middlewares/validateParams");

const router = express.Router();

router.post("/recentlyViewed", logProductView);

// Swagger annotation for the API
/**
 * @swagger
 * /api/v1/users/recentlyViewed/{userId}:
 *   get:
 *     summary: Get recently viewed products for a user
 *     description: This endpoint retrieves the list of recently viewed products for the specified user.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The user ID whose recently viewed products are to be retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of recently viewed products for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                     example: "PRO9002"
 *                   title:
 *                     type: string
 *                     example: "Some Product"
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 340
 *                   description:
 *                     type: string
 *                     example: "Some product info"
 *                   image:
 *                     type: string
 *                     format: uri
 *                     example: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
 *                   timestamp:
 *                     type: object
 *                     properties:
 *                       _seconds:
 *                         type: integer
 *                         example: 1732813254
 *                       _nanoseconds:
 *                         type: integer
 *                         example: 627000000
 *       400:
 *         description: Bad request if the userId is missing or invalid.
 *       404:
 *         description: User not found or no recently viewed products for the given userId.
 */
router.get("/recentlyViewed/:userId", validateParams, fetchRecentlyViewed);

module.exports = router;