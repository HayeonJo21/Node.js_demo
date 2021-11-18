const router = require("express").Router(),
jamController = require("../controllers/jamController");

router.get("/jams", jamController.getAllJams, jamController.respondJSON);
router.use(jamController.errorJSON);

module.exports = router;
