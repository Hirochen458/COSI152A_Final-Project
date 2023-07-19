const router = require("express").Router();
const homeController = require("../controllers/homeController");
const usersController = require("../controllers/usersController");

//get to the main page
router.get("/", (req, res) => {
  res.render("index.ejs");
});
router.get("/index", (req, res) => {
  res.render("index.ejs");
});

//get the link to other page
router.get("/about", homeController.About); 
router.get("/contact", homeController.Contact); 
router.get("/chat", usersController.checkLogin, homeController.Chat);

module.exports = router;