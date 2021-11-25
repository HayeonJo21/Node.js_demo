const router = require("express").Router(),
postController = require("../controllers/postController");


router.get("/registerForm", postController.showRegisterForm);
router.post("/register", postController.create, postController.searchPostForIndex, postController.indexView);
router.get("/qna", postController.searchPostForIndex, postController.indexView);

 module.exports = router;
