const express = require("express");
const { logProductView, fetchRecentlyViewed } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const validateParams = require("../middlewares/validateParams");

const router = express.Router();

router.post("/recentlyViewed", logProductView);
router.get("/recentlyViewed/:userId", validateParams, fetchRecentlyViewed);

module.exports = router;