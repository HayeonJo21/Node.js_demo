const User = require("../models/user");
const Jam = require("../models/jam");
const passport = require("passport");
const {body, validationResult} = require("express-validator");

getJamParams = (body) => {
  return{
    title: body.title,
    location: body.location,
    date: body.date,
    requiredPosition: body.requiredPosition,
    host: body.host,
    description: body.description
  };
};

module.exports = {
  errorValidate: (req, res, next) => {
     const error = validationResult(req).errors;
         if(Object.keys(error).length !== 0) {
           let messages = error.map(e => e.msg);
           req.skip = true;
           req.flash("error",  messages);
           res.locals.redirect = "/jam/registerForm";
             next();
         }else{
           next();
         }
   },

  create: (req, res, next) => {
   if(req.skip) next();

   let newJam = new Jam(getJamParams(req.body));

   Jam.create(newJam)
   .then(() => {
     console.log("*****SUCCESS******");
      req.flash("success", "글이 등록되었습니다.");
      User.findById(newJam.host)
      .then(user => {
        console.log("*****SUCCESS!!!!!!******");
        res.render("jamDetail", {
          jam: newJam,
          user: user
        });
        next();
      })
      .catch(error => {
        console.log("Error fetching user by ID: " + error.message);
        next(error);
      });
      next();
  })
  .catch(error => {
    console.log("#####ERROR#####" + error.message);
    req.flash("error", "글 등록에 실패했습니다. 다시 시도해주세요.");
    res.locals.redirect = "/jam/registerForm";
    next();
  });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if(redirectPath) res.redirect(redirectPath);
    else next();
  },

  // show: (req, res, next) => {
  //   let jamId = req.params.id;
  //   User.findById(userId)
  //   .then(user => {
  //     res.locals.user = user;
  //     next();
  //   })
  //   .catch(error => {
  //     console.log("Error fetching user by ID: " + error.message);
  //     next(error);
  //   });
  // },
  //
  // showDetailPage: (req, res) => {
  //   res.render("mypage");
  // },

//   edit: (req, res, next) => {
//     let userId = req.params.id;
//     User.findById(userId)
//     .then(user => {
//       res.render("userUpdateForm", {
//         user: user
//       });
//     })
//     .catch(error => {
//       console.log("Error fetching user by ID " + error.message);
//       next(error);
//     });
//   },
//
//   update: (req, res, next) => {
//     let userId = req.params.id,
//     userParams = {
//       name: req.body.name,
//       nickname: req.body.nicnname,
//       id: req.body.id,
//       password: req.body.password,
//       email: req.body.email,
//       profile: req.body.profile,
//       position: req.body.position
//     };
//
//     User.findByIdAndUpdate(userId, {
//       $set: userParams
//     })
//     .then(user => {
//       res.locals.redirect = "/mypage/" + userId;
//       res.locals.user = user;
//       next();
//     })
//     .catch(error => {
//       console.log("Error updating user by ID: " + error.message);
//       next(error);
//     });
//   },
//
//   delete: (req, res, next) => {
//   let userId = req.params.id;
//   User.findByIdAndRemove(userId)
//   .then(() => {
//     res.locals.redirect = "/"
//     req.flash("success", "탈퇴가 완료되었습니다.");
//     next();
//   })
//   .catch(error => {
//     console.log("Error deleting user by ID : " + error.message);
//     next();
//   });
// },

registerForm: (req, res) => {
  res.render("jamRegisterForm");
},

showDetailPage: (req, res) => {
  res.render("jamDetail");
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
