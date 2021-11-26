const router = require("express").Router(),
postController = require("../controllers/postController");


router.get("/registerForm", postController.showRegisterForm);
router.post("/register", postController.create, postController.searchPostForIndex, postController.indexView);
router.get("/qna", postController.searchPostForIndex, postController.searchCommentsForIndex, postController.indexView);
router.post("/comment/register", postController.commentCreate, postController.searchPostForIndex, postController.searchCommentsForIndex, postController.indexView);
router.get("/comment/delete/:id", postController.delete, postController.redirectView);

 module.exports = router;
