const express = require("express");
const { registerUser, loginUser, getCurrentUser } = require("../controllers/userControllers");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getCurrentUser", authMiddleware, getCurrentUser);

module.exports = router;