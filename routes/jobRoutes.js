const router = require("express").Router();
const jobsController = require("../controllers/jobsController");
const usersController = require("../controllers/usersController");

//main and new and create
router.get("/", jobsController.index, jobsController.indexView);
router.get("/new", usersController.checkLogin, usersController.isAdmin, jobsController.new);
router.post("/create", usersController.checkLogin, usersController.isAdmin, jobsController.create, jobsController.redirectView);

//single job to edit or update
router.get("/:id", jobsController.show, jobsController.showView);
router.get("/:id/edit", usersController.checkLogin, jobsController.edit);
router.put("/:id/update", usersController.checkLogin, usersController.isAdmin, jobsController.update, jobsController.redirectView);

//single job to delete
router.delete("/:id/delete", usersController.checkLogin, usersController.isAdmin, jobsController.delete, jobsController.redirectView);

module.exports = router;