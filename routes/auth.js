const router = require("express").Router();

const { login, register } = require("../controllers");
// register
router.route("/register").post(register);

//  login
router.route("/login").post(login);

module.exports = router;
