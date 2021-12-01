const router = require("express").Router(),
userController = require("../controllers/userController"),
homeController = require("../controllers/homeController"),
registerController = require("../controllers/registerController"),
dmController = require("../controllers/dmController");

const {body, validationResult} = require("express-validator");
const methodOverride = require("method-override");

router.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

//회원가입
router.get("/registerForm", userController.registerForm);
router.post("/register",
[
   body("name", "이름을 입력하세요.").notEmpty(),
   body("email", "이메일을 입력해주세요.").notEmpty(),
   body("email", "이메일 형식을 확인하세요.").isEmail(),
   body("password", "비밀번호를 입력하세요.").notEmpty(),
 ]
 , registerController.errorValidate, registerController.create, registerController.redirectView);

// 로그인 & 로그아웃
router.get("/login", userController.login);
router.post("/login", userController.authenticate);
router.get("/logout", userController.logout, userController.redirectView);

// 마이페이지 & 업데이트 & 회원탈퇴 & 내 게시물 보기
router.get("/mypage/:id", userController.show, userController.showMypage);
router.get("/edit/:id", userController.edit);
router.get("/manage/postings/:id", userController.searchJams, userController.searchPost, userController.searchComments, userController.showMyPostings);
router.put("/update/:id", userController.update, userController.redirectView);
router.delete("/delete/:id", userController.delete, userController.redirectView);

//다른 유저 정보 보기 & 메시지 보내기 폼 & 메시지 보내기
router.get("/:id", userController.show, userController.showUser);
router.get("/sendMessage/:id", homeController.show, homeController.showDMForm);
router.post("/dm/send", dmController.create);

module.exports = router;
