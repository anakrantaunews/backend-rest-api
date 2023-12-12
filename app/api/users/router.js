const express = require("express");
const router = express.Router();
const { getAllUser, getOneUser, updateInfoUser, deleteUser} = require("./controller");
const {authenticateUser, authorizeRoles} = require("../../middleware/auth")

router.get("/", getAllUser);
router.get("/:id", getOneUser);

router.delete("/:id", authenticateUser, authorizeRoles("admin") , deleteUser);
router.put("/", authenticateUser, updateInfoUser);

module.exports = router