const User = require("../models/user");
const Jam = require("../models/jam");
const Post = require("../models/post");
const Comment = require("../models/comment");
const passport = require("passport");
const LocalStrategy = require("passport-local");

module.exports = {
  login: (req, res) => {
    res.render("adminLogin");
  },

  authenticate: (req, res, next) => {
    username = req.body.id;
    password = req.body.password;

    if(username == "admin" && password == "admin"){
      User.findById(username)
      .then(user => {
        if(user.position == "admin"){
          req.flash("success", "관리자 모드로 로그인 되었습니다.");
          next();
      }
    })
     .catch(error => {
        console.log("#####ERROR#####  " + error.message);
        req.flash("error", "관리자 계정이 아닙니다.");
        res.locals.redirect = "/";
        next();
      });

}
},

  logout: (req, res, next) => {
    req.logout();
    req.flash("success", "로그아웃 되었습니다.");
    res.locals.redirect = "/";
    next();
  },

  showIndex: (req, res) => {
    res.render("adminIndex");
  },

  delete: (req, res, next) => {
  let userId = req.params.id;
  User.findByIdAndRemove(userId)
  .then(() => {
    res.locals.redirect = "/"
    next();
  })
  .catch(error => {
    console.log("Error deleting user by ID : " + error.message);
    next();
  });
},
redirectView: (req, res, next) => {
  let redirectPath = res.locals.redirect;
  if(redirectPath) res.redirect(redirectPath);
  else next();
}
}
