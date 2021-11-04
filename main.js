const port = 3000,
http = require("http"),
httpStatus = require("http-status-codes"),
contentTypes = require("./content-types"),
homeController = require("./controllers/homeController"),
errorController = require("./controllers/errorController"),
subscribersController = require("./controllers/subscribersController"),
registerController = require("./controllers/registerController"),
express = require("express");

const app = express();
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const layouts = require("express-ejs-layouts");
const Course = require("./models/course");
const User = require("./models/user");

mongoose.connect(
  "mongodb://localhost:27017/soundy",
  {useNewUrlParser: true}
);

const db = mongoose.connection;

db.once("open", ()=> {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(layouts);

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(express.json());

app.get("/", homeController.showIndex);
app.get("/courses", homeController.showCourses);
app.get("/login", homeController.loginForm);
app.get("/registerForm", homeController.registerForm);
app.get("/gameSound", homeController.gameSoundMain);
app.get("/market", homeController.showMarket);
app.get("/jam", homeController.showJam);
app.get("/bgm", homeController.showBgm);
app.get("/qna", homeController.showQnA);
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/register", registerController.register);
// app.post("/subscribe", subscribersController.saveSubscriber);
app.get("/subscribers", subscribersController.getAllSubscribers, (req, res, next) => {
  console.log(req.data);
  next();
});

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log("Server running at http://localhost:" + port);
});
