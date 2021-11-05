const User = require("../models/user");

exports.register = (req, res) => {
  
  let newUser = new User({
    name: req.body.name,
    nickname: req.body.nickname,
    id: req.body.id,
    password: req.body.password,
    email: req.body.email,
    profile: req.body.profile,
    position: req.body.position
  });

newUser.save()
.then( () => {
  res.render("thanks");
})
.catch(error => {
  res.send(error);
});
};
