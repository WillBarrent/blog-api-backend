const { Router } = require("express");
const {
  postCreate,
  postRead,
  postReadAll,
  postUpdate,
  postDelete,
} = require("../controllers/post");
const { validatePost } = require("../utils/validation");
const post = Router();

// Create Post

post.post("/", validatePost, postCreate);

// Read 1 Post

post.get("/:postId", postRead);

// Read All Posts

post.get("/", postReadAll);

// Update Post

post.put("/:postId", validatePost, postUpdate);

// Delete Post

post.delete("/:postId", postDelete);

module.exports = post;
