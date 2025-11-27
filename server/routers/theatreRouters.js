const express = require("express");
const { addTheatre, updateTheatre, deleteTheatre, getAllTheatres } = require("../controllers/theatreControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.use(authMiddleware);

router.post("/add", addTheatre);
router.put("/update/:id", updateTheatre);
router.delete("/delete/:id", deleteTheatre);
router.get("/all", getAllTheatres)

module.exports = router;
