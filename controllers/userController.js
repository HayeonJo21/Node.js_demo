const User = require("../models/user");
const passport = require("passport");

module.exports = {
  login: (req, res) => {
    res.render("login");
  },

  authenticate: passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: "로그인에 실패했습니다.",
    successRedirect: "/",
    successFlash: "로그인 되었습니다."
  }),

  logout: (req, res, next) => {
    req.logout();
    req.flash("success", "로그아웃 되었습니다.");
    res.locals.redirect = "/";
    next();
  }

  // authenticate: (req, res, next) => {
  //   User.findOne({id: req.body.id})
  //   .then(user => {
  //     if(user){
  //       user.passwordComparison(req.body.password)
  //       .then(passwordsMatch => {
  //         if(passwordsMatch){
  //           res.render("index", {
  //               flashMessages: {
  //                 success: req.body.id + "님 로그인 되었습니다."
  //               }
  //             });
  //         } else{
  //           res.render("login", {
  //             flashMessages: {
  //               error: "로그인 실패입니다. 다시 시도해주세요."
  //             }
  //           });
  //         }
  //           next();
  //       });
  //
  //     } else {
  //       res.render("login", {
  //         flashMessages: {
  //           error: "로그인 실패입니다. 다시 시도해주세요."
  //         }
  //       });
  //       next();
  //     }
  //   })
  //   .catch(error => {
  //     console.log("Error logging in user: " + error.message);
  //     next(error);
  //   });
  // }
}

//해싱 전 로그인 로직
// console.log("PASSWORD: " + user.password + "//" + req.body.password);
// if (user && user.password === req.body.password){
//   res.render("index", {
//     flashMessages: {
//       success: req.body.id + "님 로그인 되었습니다."
//     }
//   });
