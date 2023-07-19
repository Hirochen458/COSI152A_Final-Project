const mongoose = require("mongoose");
const express = require("express");
const methodOverride = require("method-override");
const connectFlash = require("connect-flash");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const expressValidator = require("express-validator");
const layouts = require("express-ejs-layouts");
const User = require("./models/user");
const passport = require("passport");
const router = require("./routes/index");
const socketio = require("socket.io");
const chatController = require("./controllers/chatController");

mongoose.connect("mongodb://localhost:27017/brandeis_ssa_db");

const app = express();
app.use(layouts);

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

app.use(cookieParser("secret-pascode"));
app.use(expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 40000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(connectFlash());
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.enable('verbose errors');
//It serves static files
app.use(express.static("public"));
//ejs engine, convert .ejs to .html, expect .ejs in views
app.set("view engine", "ejs");

const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to mongodb!");
});

app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

//listen port 8080
app.set("port", process.env.PORT || 8080);

app.use("/", router);

const server = app.listen(app.get("port"), () => {
  console.log(`server is running at http://localhost:${app.get("port")}`);
});

//pass server to sockerio
const io = socketio(server);
//pass io to chatController
chatController(io);

