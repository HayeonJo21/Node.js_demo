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
router.post("/login", adminController.authenticate, adminController.showIndex, adminController.redirectView);
router.get("/logout", userController.logout, adminController.redirectView);


module.exports = router;
