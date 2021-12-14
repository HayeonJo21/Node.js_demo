const port = 3000,
express = require("express"),
http = require("http"),
httpStatus = require("http-status-codes"),
contentTypes = require("./content-types"),
homeController = require("./controllers/homeController"),
userController = require("./controllers/userController"),
errorController = require("./controllers/errorController"),
registerController = require("./controllers/registerController"),
router = require("./routes/index");

const app = express();
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const layouts = require("express-ejs-layouts");
const Course = require("./models/course");
const User = require("./models/user");
const {body, validationResult} = require("express-validator");
const methodOverride = require("method-override");

app.set("port", process.env.PORT || 3000);

const server = app.listen(app.get("port"), () => {
  console.log("Server running at http://localhost:" + `${app.get("port")}`);
});

const io = require("socket.io")(server);
const chatController = require("./controllers/chatController")(io);

app.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

const passport = require("passport");

mongoose.connect(process.env.MONGODB_URI,
  {useNewUrlParser: true});

console.log("########### mongodb uri: " + process.env.MONGODB_URI);

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
app.use("/", router);

passport.use(User.createStrategy()); //사용자의 로그인 스트래티지 설정
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); //직렬화와 역직렬화 작업 하도록 설정

app.get("token");
