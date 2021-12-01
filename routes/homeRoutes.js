const router = require("express").Router(),
homeController = require("../controllers/homeController"),
dmController = require("../controllers/dmController");

router.get("/", homeController.showIndex);
router.get("/courses", homeController.showCourses);
router.get("/contact", homeController.showContact);
router.get("/gameSound", homeController.gameSoundMain);
router.get("/market", homeController.showMarket);
router.get("/jam", homeController.showJam);
router.get("/bgm", homeController.showBgm);
router.get("/chat/:id", dmController.show);
router.get("/chatAll", homeController.chatAll);
router.get("/directMessage/:id", dmController.showDM);
router.get("/thanks", homeController.thanks);

module.exports = router;
