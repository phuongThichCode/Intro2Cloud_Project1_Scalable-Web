const express = require("express");
const postController = require("../controllers/post-controller.js");
const router = express.Router();


router.get("/search", postController.searchPosts);

router.get("/:id", postController.getPost);


router.get("/", postController.getAllPosts);

router.put("/:id", postController.updatePost);

router.post("/", postController.addPost);

router.delete("/:id", postController.deletePost);

module.exports = router;