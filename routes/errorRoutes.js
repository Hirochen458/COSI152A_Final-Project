const router = require("express").Router();
const errorController = require("../controllers/errorController");

//log erroe
router.use(errorController.logErrors);
//404 error handler
router.use(errorController.pageNotFoundError);
//500 error handler
router.use(errorController.internalServerError);

module.exports = router;