const router = require("express").Router();
var db = require("../../models/");
const loginController = require("../../controller/loginController");

// Matches with "/api/login"
router.route("")
    .post(loginController.create)

router.route("/:username")
    .get(loginController.findOne)

module.exports = router;