const express = require("express");
const ShowController = require("../controllers/showController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
router.use(authMiddleware);

router.post("/getAllShowsForTheatreId", ShowController.getAllShowsForTheatre);
router.put("/updateShow/:id", ShowController.updateShow);
router.delete("/deleteShow/:id", ShowController.deleteShow);
router.post("/addShowByTheatreId", ShowController.addShowByTheatre);
router.post("/getAllShowsByTheatre", ShowController.getAllShowsByTheatre);
router.get("/getShow/:id", ShowController.getShow);

module.exports = router;