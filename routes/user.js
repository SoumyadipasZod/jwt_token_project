const router = require("express").Router();
const UserController = require("../controllers/UserController");
const verify = require("../middlewares/verify");

router.get("/", UserController.index); // use for render
router.get("/registration", UserController.registration); // use for render
router.post("/registration", [verify.verifyUser], UserController.addUser); // for submit data
router.post("/login", UserController.login);
router.get("/dashboard", UserController.userAuth, UserController.dashboard);
router.get("/logout", UserController.logout);

module.exports = router;