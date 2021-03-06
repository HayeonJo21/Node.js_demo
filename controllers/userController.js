const User = require("../models/user");
const Jam = require("../models/jam");
const Post = require("../models/post");
const Comment = require("../models/comment");
const passport = require("passport");

module.exports = {
  login: (req, res) => {
    res.render("login");
  },

  authenticate: passport.authenticate("local", {
    failureRedirect: "/user/login",
    failureFlash: "로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.",
    successRedirect: "/",
    successFlash: "로그인 되었습니다."
  }),

  logout: (req, res, next) => {
    req.logout();
    req.flash("success", "로그아웃 되었습니다.");
    res.locals.redirect = "/";
    next();
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if(redirectPath) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
    .then(user => {
      res.locals.user = user;
      next();
    })
    .catch(error => {
      console.log("Error fetching user by ID: " + error.message);
      next(error);
    });
  },

  showUser: (req, res) => {
    res.render("showUser");
  },

  showMypage: (req, res) => {
    res.render("mypage");
  },

  edit: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
    .then(user => {
      res.render("userUpdateForm", {
        user: user
      });
    })
    .catch(error => {
      console.log("Error fetching user by ID " + error.message);
      next(error);
    });
  },

  update: (req, res, next) => {
    let userId = req.params.id,
    userParams = {
      name: req.body.name,
      nickname: req.body.nicnname,
      id: req.body.id,
      password: req.body.password,
      email: req.body.email,
      profile: req.body.profile,
      position: req.body.position
    };

    User.findByIdAndUpdate(userId, {
      $set: userParams
    })
    .then(user => {
      res.locals.redirect = "/user/mypage/" + userId;
      res.locals.user = user;
      next();
    })
    .catch(error => {
      console.log("Error updating user by ID: " + error.message);
      next(error);
    });
  },

  delete: (req, res, next) => {
  let userId = req.params.id;
  User.findByIdAndRemove(userId)
  .then(() => {
    res.locals.redirect = "/"
    req.flash("success", "탈퇴가 완료되었습니다.");
    next();
  })
  .catch(error => {
    console.log("Error deleting user by ID : " + error.message);
    next();
  });
},

registerForm: (req, res) => {
  res.render("registerForm");
},

searchComments: (req, res, next) => {
  let userId = req.params.id;

  Comment.find({writer : userId})
  .then(comments => {
    res.locals.comments = comments;
    console.log("User Comments loaded.");
    next();
  }).catch(error => {
    console.log("Error fetching user by ID : " + error.message);
    next();
  });
},

searchJams: (req, res, next) => {
  let userId = req.params.id;

  Jam.find({host : userId})
  .then(jams => {
    res.locals.jams = jams;
    console.log("User Jams loaded.");
    next();
  }).catch(error => {
    console.log("Error fetching user by ID : " + error.message);
    next();
  });
},

searchPost: (req, res, next) => {
  let userId = req.params.id;

  Post.find({writer : userId})
  .then(posts => {
    res.locals.posts = posts;
    console.log("User Posts loaded.");
    next();
  }).catch(error => {
    console.log("Error fetching user by ID : " + error.message);
    next();
  });
},

showMyPostings: (req, res) => {
  res.render("myPostings");
}

// verifyToken: (req, res, next) => {
//   if(req.query.apiToken == token) {
//     next();
//   }
//   else {
//     next( new Error("Invalid API token."));
//   }
// }


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
