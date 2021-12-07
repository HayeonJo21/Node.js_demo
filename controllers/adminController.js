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
    passport.use(new LocalStrategy(function(username, password, done) {
    process.nextTick(function(){
      console.log("login strategy check: " + username + "/" + password);

      if(username == 'admin' && password == 'admin'){
        return done(null, username);
      }else{
        return done(false, null);
      }
      return done(false, null);
    });
  }))
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
}
}
