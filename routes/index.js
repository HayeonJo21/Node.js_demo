const router = require("express").Router(),
userRoutes = require("./userRoutes"),
errorRoutes = require("./errorRoutes"),
homeRoutes = require("./homeRoutes"),
apiRoutes = require("./apiRoutes"),
jamRoutes = require("./jamRoutes");

router.use("/user", userRoutes);
router.use("/jam", jamRoutes);
router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;
