const User = require("../models/user");

// exports.register = (req, res) => {
//
//   let newUser = new User({
//     name: req.body.name,
//     nickname: req.body.nickname,
//     id: req.body.id,
//     password: req.body.password,
//     email: req.body.email,
//     profile: req.body.profile,
//     position: req.body.position
//   });
//
// newUser.save()
// .then( () => {
//   res.render("thanks");
// })
// .catch(error => {
//   res.send(error);
// });
// };

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
  create: (req, res, next) => {
    let userParams = getUserParams(req.body);
    User.create(userParams)
    .then(user => {
      req.flash("Success", user.fullName + "'s account created successfully!");
      res.locals.redirect ="/";
      res.locals.user = user;
      next();
    })
    .catch(error => {
      console.log("Error saving user: " + error.message);
      res.locals.redirect = "/registerForm";
      req.flash(
        "error",
        'Failed to create user account because: ${error.message}'
      );
      next();
    });
  }
};
