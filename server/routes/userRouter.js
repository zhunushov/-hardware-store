const Router = require("express");
const router = new Router();
const userController = require("../controller/userController");
const authMidleware = require("../middleware/authMidleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", authMidleware, userController.check);
module.exports = router;
