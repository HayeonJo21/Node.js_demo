const router = require("express").Router(),
jamController = require("../controllers/jamController");

router.get("/jams", jamController.getAllJams, jamController.filterUserJams, jamController.respondJSON);
router.use(jamController.errorJSON);
router.get("/jams/:id/join", jamController.join, jamController.respondJSON);

module.exports = router;
