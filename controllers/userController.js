const User = require("../models/user");

module.exports = {
  login: (req, res) => {
    res.render("login");
  },

  authenticate: (req, res, next) => {
    User.findOne({
      id: req.body.id
    })
    .then(user => {
      console.log("PASSWORD: " + user.password + "//" + req.body.password);
      if (user && user.password === req.body.password){
        res.render("index", {
          flashMessages: {
            success: req.body.id + "님 로그인 되었습니다."
          }
        });
        next();
      } else {
        res.render("login", {
          flashMessages: {
            error: "로그인 실패입니다. 다시 시도해주세요."
          }
        });
        next();
      }
    })
    .catch(error => {
      console.log("Error logging in user: " + error.message);
      next(error);
    });
  }
}
