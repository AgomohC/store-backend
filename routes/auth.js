const router = require("express").Router();

const { login, register } = require("../controllers");
// register
router.route("/").post(register);

//  login
router.route("/").post(login);

module.exports = router;
