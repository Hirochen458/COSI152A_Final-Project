const router = require("express").Router();
const usersController = require("../controllers/usersController");

//main and new and create
router.get("/",usersController.index,usersController.indexView);
router.get("/new", usersController.new);
router.post("/create", usersController.validate, usersController.create, usersController.redirectView);

//user login and logout
router.get("/login", usersController.login);
router.post("/login", usersController.authenticate, usersController.addFlash, usersController.redirectView);
router.get("/logout", usersController.logout, usersController.isAdminOrSelf, usersController.redirectView);

//user edit and update
router.get("/:id", usersController.show, usersController.showView);
router.get("/:id/edit", usersController.checkLogin, usersController.isAdminOrSelf, usersController.edit,usersController.redirectView);
router.put("/:id/update", usersController.checkLogin, usersController.isAdminOrSelf, usersController.update, usersController.redirectView);

//delete user
router.delete("/:id/delete", usersController.checkLogin, usersController.isAdminOrSelf, usersController.delete, usersController.redirectView);

module.exports = router;