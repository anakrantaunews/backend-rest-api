const express = require("express");
const {
  getAllPosts,
  createPost,
  getOnePost,
  updatePost,
  deletePost,
  updatePostByUser,
  deletePostByUser,
  getAllPostsByUser,
} = require("./controller");
const router = express.Router();
const uploadMiddleware = require("../../middleware/multer");
const { authenticateUser, authorizeRoles } = require("../../middleware/auth");

router.get("/", getAllPosts);
router.get("/get-by-user", authenticateUser, authorizeRoles("user") ,getAllPostsByUser);
router.get("/:id", getOnePost);
router.delete("/:id", authenticateUser, authorizeRoles("admin"), deletePost);
router.delete("/delete-by-user/:id", authenticateUser, authorizeRoles("user"), deletePostByUser);
router.put(
  "/:id",
  uploadMiddleware.fields([
    { name: "thumbnail", maxCount: 1 },
  ]),
  authenticateUser,
  authorizeRoles("admin"),
  updatePost
);
router.put(
  "/update-by-user/:id",
  uploadMiddleware.fields([
    { name: "thumbnail", maxCount: 1 },
  ]),
  authenticateUser,
  authorizeRoles("user"),
  updatePostByUser
);
router.post(
  "/",
  uploadMiddleware.fields([
    { name: "thumbnail", maxCount: 1 },
  ]),
  authenticateUser,
  authorizeRoles("admin", "user"),
  createPost
);

module.exports = router;
