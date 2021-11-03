
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

exports.loginForm = (req, res) => {
  res.render("login");
};

exports.gameSoundMain = (req, res) => {
  res.render("gameSoundMain");
};
