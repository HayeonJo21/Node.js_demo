const router = require("express").Router(),
jamController = require("../controllers/jamController");

const {body, validationResult} = require("express-validator");
const methodOverride = require("method-override");

router.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

//Jam 글 등록
router.get("/registerForm", jamController.registerForm);
router.post("/register",
[
   body("title", "제목을 입력하세요.").notEmpty(),
   body("date", "날짜를 입력하세요.").notEmpty(),
   body("location", "장소를 입력하세요.").notEmpty(),
   body("requiredPosition", "포지션을 선택하세요.").notEmpty(),
 ]
 , jamController.errorValidate, jamController.create, jamController.getUserInfo, jamController.showDetailPage);

 //Jam 디테일 페이지
 router.get("/detail", jamController.showDetailPage);

 module.exports = router;
