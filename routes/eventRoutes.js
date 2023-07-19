const router = require("express").Router(); 
const eventsController = require("../controllers/eventsController");
const usersController = require("../controllers/usersController");

//main and new and create
router.get("/",  eventsController.index, eventsController.indexView); 
router.get("/new", usersController.checkLogin, usersController.isAdmin, eventsController.new); 
router.post("/create", usersController.checkLogin, usersController.isAdmin, eventsController.create, eventsController.redirectView); 

//single event to edit or update
router.get("/:id", eventsController.show, eventsController.showView); 
router.get("/:id/edit", usersController.checkLogin, eventsController.edit); 
router.put("/:id/update", usersController.checkLogin, usersController.isAdmin, eventsController.update, eventsController.redirectView); 

//single event to delete
router.delete("/:id/delete", usersController.checkLogin, usersController.isAdmin, eventsController.delete, eventsController.redirectView); 
router.post("/:id/register", usersController.checkLogin, eventsController.register, eventsController.redirectView); 

module.exports = router;
