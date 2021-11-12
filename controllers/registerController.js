const User = require("../models/user");
const {body, validationResult} = require("express-validator");

getUserParams = (body) => {
  return{
    name: body.name,
    nickname: body.nickname,
    id: body.id,
    password: body.password,
    email: body.email,
    profile: body.profile,
    position: body.position
  };
};

module.exports = {

 errorValidate: (req, res, next) => {
    const error = validationResult(req).errors;
        if(Object.keys(error).length !== 0) {
          let messages = error.map(e => e.msg);
          req.skip = true;
          req.flash("error",  messages);
          res.locals.redirect = "/user/registerForm";
            next();
        }else{
          next();
        }
  },

create: (req, res, next) => {
  if(req.skip) next();

  let newUser = new User(getUserParams(req.body));

  User.register(newUser, req.body.password, (error, user) => {

    if (user) {
      console.log("#######LOG######");
      req.flash("success", "성공적으로 회원가입 되었습니다.");
      res.locals.redirect = "/";
      next();
    }
    else {
      console.log("*******ERROR******");
      req.flash("error", "회원가입에 실패했습니다. 다시 시도해주세요.");
      res.locals.redirect = "/registerForm";
      next();
    }
  });
},

redirectView: (req, res, next) => {
  let redirectPath = res.locals.redirect;
  if(redirectPath) res.redirect(redirectPath);
  else next();
}

  // create: (req, res, next) => {
  //   let userParams = getUserParams(req.body);
  //   User.create(userParams)
  //   .then(user => {
  //     // req.flash("Success", user.fullName + "'s account created successfully!");
  //     // res.locals.redirect ="/thanks";
  //     // res.locals.user = user;
  //     res.render("thanks", {
  //       flashMessages: {
  //         success: userParams.name + "님의 회원 등록이 성공적으로 완료되었습니다."
  //       }
  //     });
  //     next();
  //   })
  //   .catch(error => {
  //     console.log("Error saving user: " + error.message);
  //     // res.locals.redirect = "/error";
  //     // req.flash(
  //     //   "error",
  //     //   'Failed to create user account because: ${error.message}'
  //     // );
  //     res.render("index", {
  //       flashMessages: {
  //         error: "회원가입에 실패했습니다. 다시 시도해주세요."
  //       }
  //     });
  //     next();
  //   });
  // }



    // validate: (req, res, next) => {
    //   console.log("VALIDATOR");
    //   body("email", "이메일을 다시 확인해주세요.").isEmail().notEmpty();
    //   body("password", "Password cannot be empty.").notEmpty();
    //
    //     const error = validationResult(req).errors;
    //     if(Object.keys(error).length !== 0) {
    //       let messages = error.array().map(e => e.msg);
    //       console.log("###ERROR " + messages);
    //       req.skip = true;
    //       req.flash("error", "정확한 정보를 입력해주세요.");
    //       res.locals.redirect = "/registerForm";
    //     }
    //       next();
    // },
};
