const { getAllMovies, updateMovie, deleteMovie, addMovie, getMovie} = require("../controllers/movieControllers");
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/fetchAllMovies", getAllMovies);
router.get("/getMovie/:id", getMovie);
router.put("/updateMovie/:id", updateMovie);
router.delete("/deleteMovie/:id", deleteMovie);
router.post("/addMovie", addMovie);

module.exports = router;