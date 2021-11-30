const router = require("express").Router(),
jamController = require("../controllers/jamController");

const {body, validationResult} = require("express-validator");
const methodOverride = require("method-override");

router.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));
//Jam 메인페이지
router.get("/main", jamController.getAllJams, jamController.searchForJoinedJam, jamController.indexView);

//Jam 글 등록
router.get("/registerForm", jamController.registerForm);
router.post("/register",
[
   body("title", "제목을 입력하세요.").notEmpty(),
 ]
 , jamController.errorValidate, jamController.create, jamController.getUserInfo, jamController.searchForJoinedJam, jamController.showDetailPage);

 //Jam 디테일 페이지
 router.get("/detail", jamController.showDetailPage);
 router.get("/detail/:id", jamController.getUserForDetail, jamController.showDetailPage,  jamController.searchForJoinedJam, jamController.showDetailView);

 //Jam Update, edit, delete, join
 router.get("/edit/:id", jamController.edit);
 router.get("/join/:id", jamController.showJoinForm);
 router.put("/update/:id", jamController.update, jamController.redirectView);
 router.delete("/delete/:id", jamController.delete, jamController.redirectView);

//Jam 답글 등록
router.post("/join/register", jamController.createJoin, jamController.getUserInfo, jamController.searchForJoinedJam, jamController.showDetailPage);

 module.exports = router;
