const router = require("express").Router(),
jamController = require("../controllers/jamController"),
postController = require("../controllers/postController");
// userController = require("../controllers/userController"),
// token = process.env.TOKEN || "soundyT0k3n";
//
// router.use(userController.verifyToken);
router.use(jamController.errorJSON);

router.get("/jams", jamController.getAllJams, jamController.filterUserJams, jamController.respondJSON);
router.get("/jams/:id/join", jamController.join, jamController.respondJSON);
router.get("/post/comments/:id/show", postController.getComments);
module.exports = router;
