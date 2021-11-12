const router = require("express").Router(),
homeController = require("../controllers/homeController");

router.get("/", homeController.showIndex);
router.get("/courses", homeController.showCourses);
router.get("/gameSound", homeController.gameSoundMain);
router.get("/market", homeController.showMarket);
router.get("/jam", homeController.showJam);
router.get("/bgm", homeController.showBgm);
router.get("/qna", homeController.showQnA);

module.exports = router;
