const router = require("express").Router();
const userRoutes = require("./userRoutes"),
  jobRoutes = require("./jobRoutes"),
  eventRoutes = require("./eventRoutes"),
  homeRoutes = require("./homeRoutes"),
  errorRoutes = require("./errorRoutes"),
  apiRoutes = require("./apiRoutes");

router.use("/users", userRoutes);
router.use("/jobs", jobRoutes);
router.use("/events", eventRoutes);
router.use("/api", apiRoutes);
router.use("/", homeRoutes);
//router.use("/", errorRoutes);

module.exports = router;