const router = require("express").Router();
const { getcurrentUser, getUserById } = require("../controllers/userController");
const ServiceController = require("../controllers/userController")

//token autenticação
const AuthGuard = require("../middleware/AuthGuard")

//post
router.route("/register").post((req, res) => ServiceController.register(req, res));
router.route("/login").post((req, res) => ServiceController.login(req, res));

//get logged in user
router.route("/user").get(AuthGuard, getcurrentUser, (req, res) => ServiceController.getAll(req, res));

//get all user
router.route("/userall").get(AuthGuard, (req, res) => ServiceController.getAll(req, res));

router.get("/:id", getUserById)


module.exports = router;