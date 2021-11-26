const User = require("../models/user");
const passport = require("passport");

var courses = [
  {
    title: "Event Driven Cakes",
    cost: 50
  },
  {
    title: "Asynchronous Artichoke",
    cost: 25
  },
  {
    title: "Object Oriented Orange Juice",
    cost: 10
  }
];

exports.showIndex =(req, res) => {
  res.render("index");
};

exports.showCourses = (req, res) => {
  res.render("courses", { offeredCourses : courses });
};

exports.postedContactForm = (req, res) => {
  res.render("thanks");
};

exports.gameSoundMain = (req, res) => {
  res.render("pre-site");
  // res.render("gameSoundMain");
};

exports.showMarket = (req, res) => {
    res.render("pre-site");
  // res.render("market");
}

exports.showBgm = (req, res) => {
    res.render("pre-site");
  // res.render("elements");
}

exports.showJam = (req, res) => {
  res.render("jam");
}

exports.showQnA = (req, res) => {
  res.render("qna");
}

exports.chatAll = (req, res) => {
  res.render("chat");
}

exports.show = (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
    .then(user => {
      res.locals.receiver = user;
      next();
    })
    .catch(error => {
      console.log("Error fetching user by ID: " + error.message);
      next(error);
    });
  }

  exports.showDMForm = (req, res) => {
    res.render("directChat");
  }
