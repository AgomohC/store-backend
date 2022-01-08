const router = require("express").Router();

const { login, register } = require("../controllers");
// register
router.route("/auth").post(register);

//  login
router.route("/auth").post(login);

module.exports = router;
