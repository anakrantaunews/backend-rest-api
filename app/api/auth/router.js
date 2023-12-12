const express = require("express")
const router = express.Router()

const {signin,signup, signinAdmin,signupAdmin} = require("./controller")

router.post("/signin", signin);
router.post("/signin-admin", signinAdmin);
router.post("/signup-admin", signupAdmin);
router.post("/signup", signup);

module.exports = router