const express = require("express");
const {
  getAllPosts,
  createPost,
  getOnePost,
  updatePost,
  deletePost,
} = require("./controller");
const router = express.Router();
const uploadMiddleware = require("../../middleware/multer");
const { authenticateUser, authorizeRoles } = require("../../middleware/auth");

router.get("/", getAllPosts);
router.get("/:id", getOnePost);
router.delete("/:id", authenticateUser, authorizeRoles("admin"), deletePost);
router.put(
  "/:id",
  uploadMiddleware.fields([
    { name: "thumbnail", maxCount: 1 },
  ]),
  authenticateUser,
  authorizeRoles("admin"),
  updatePost
);
router.post(
  "/",
  uploadMiddleware.fields([
    { name: "thumbnail", maxCount: 1 },
  ]),
  authenticateUser,
  authorizeRoles("admin"),
  createPost
);

module.exports = router;
