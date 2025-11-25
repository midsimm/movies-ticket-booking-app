const express = require("express");
const { addTheatre } = require("../controllers/theatreControllers");
const router = express.Router();

router.post("/add", addTheatre);

module.exports = router;
