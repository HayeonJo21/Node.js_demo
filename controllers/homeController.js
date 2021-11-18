
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
  res.render("gameSoundMain");
};

exports.showMarket = (req, res) => {
  res.render("market");
}

exports.showBgm = (req, res) => {
  res.render("elements");
}

exports.showJam = (req, res) => {
  res.render("jam");
}

exports.showQnA = (req, res) => {
  res.render("qna");
}

exports.chat = (req, res) => {
  res.render("chat");
}
