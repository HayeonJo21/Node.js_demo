const router = require("express").Router(),
userController = require("../controllers/userController"),
adminController = require("../controllers/adminController");
homeController = require("../controllers/homeController"),
registerController = require("../controllers/registerController"),
dmController = require("../controllers/dmController");

const {body, validationResult} = require("express-validator");
const methodOverride = require("method-override");

router.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));


// 로그인 & 로그아웃
router.get("/login", adminController.login);
router.get("/index",  adminController.showIndex);
router.post("/login", adminController.authenticate, adminController.redirectView);
router.get("/logout", userController.logout, adminController.redirectView);

//관리자 페이지 관련
router.get("/manage/users", adminController.manageUserView);
router.get("/manage/jams", adminController.login);
router.get("/manage/freeboard", adminController.login);


module.exports = router;
