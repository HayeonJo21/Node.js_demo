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
      User.find({id: username})
      .then(users => {
        users.forEach(user => {
          if(user.position == "admin"){
            req.flash("success", "관리자 모드로 로그인 되었습니다.");
            res.locals.redirect = "/admin/index";
            next();
          }
          else{
            req.flash("error", "관리자 계정이 아닙니다. 사용자 모드로 전환합니다.");
            res.locals.redirect = "/";
            next();
          }
        });
      })
     .catch(error => {
        console.log("#####ERROR#####  " + error.message);
        req.flash("error", "관리자 계정이 아닙니다.");
        res.locals.redirect = "/";
        next();
      });

}
else{
  req.flash("error", "관리자 계정이 아닙니다. 사용자 모드에서 다시 로그인하십시오.");
  res.locals.redirect = "/";
  next();
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
},

manageUserView: (req, res, next) => {
  User.find({})
  .then(users => {
    res.render("adminManageUsers", {
      "users" : users
    });
    next();
  })
  .catch(error => {
    console.log("Error search all users : " + error.message);
  });
}
}
