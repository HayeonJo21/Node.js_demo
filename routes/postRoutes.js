const router = require("express").Router(),
postController = require("../controllers/postController");


router.get("/registerForm", postController.showRegisterForm);
router.post("/register", postController.create);

 module.exports = router;
