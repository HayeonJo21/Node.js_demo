const port = 3000,
http = require("http"),
httpStatus = require("http-status-codes"),
contentTypes = require("./content-types"),
homeController = require("./controllers/homeController"),
userController = require("./controllers/userController"),
errorController = require("./controllers/errorController"),
registerController = require("./controllers/registerController"),
express = require("express");

const app = express();
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const layouts = require("express-ejs-layouts");
const Course = require("./models/course");
const User = require("./models/user");
const {body, validationResult} = require("express-validator");
const methodOverride = require("method-override");

app.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

const passport = require("passport");

mongoose.connect(
  "mongodb://localhost:27017/soundy",
  {useNewUrlParser: true}
);

const db = mongoose.connection;

db.once("open", ()=> {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

const expressSession = require("express-session"),
cookieParser = require("cookie-parser"),
connectFlash = require("connect-flash");

app.use(cookieParser("secret_passcode"));
app.use(expressSession({
  secret: "secret_passcode",
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}));

app.use(connectFlash());
app.use(passport.initialize());
app.use(passport.session());

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(layouts);
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(express.json());

passport.use(User.createStrategy()); //사용자의 로그인 스트래티지 설정
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); //직렬화와 역직렬화 작업 하도록 설정

app.get("/", homeController.showIndex);
app.get("/courses", homeController.showCourses);
app.get("/login", userController.login);
app.get("/mypage/:id", userController.show, userController.showMypage);
app.post("/login", userController.authenticate);
app.get("/logout", userController.logout, userController.redirectView);

app.get("/registerForm", homeController.registerForm);
app.get("/updateUser/:id", userController.edit);
app.put("/user/:id/update", userController.update, userController.redirectView);
app.get("/gameSound", homeController.gameSoundMain);
app.get("/market", homeController.showMarket);
app.get("/jam", homeController.showJam);
app.get("/bgm", homeController.showBgm);
app.get("/qna", homeController.showQnA);
app.get("/thanks", (req, res) => {
  res.render("thanks");
});
app.post("/register",
[
   body("name", "이름을 입력하세요.").notEmpty(),
   body("email", "이메일을 입력해주세요.").notEmpty(),
   body("email", "이메일 형식을 확인하세요.").isEmail(),
   body("password", "비밀번호를 입력하세요.").notEmpty(),
 ]
 , registerController.errorValidate, registerController.create, registerController.redirectView);
app.delete("/deleteUser/:id", userController.delete, userController.redirectView);
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log("Server running at http://localhost:" + port);
});
