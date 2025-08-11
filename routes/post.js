const { Router } = require("express");
const {
  postCreate,
  postRead,
  postReadAll,
  postUpdate,
  postDelete,
} = require("../controllers/post");
const post = Router();

// Create Post

post.post("/", postCreate);

// Read 1 Post

post.get("/:postId", postRead);

// Read All Posts

post.get("/", () => postReadAll);

// Update Post

post.put("/:postId", postUpdate);

// Delete Post

post.delete("/:postId", postDelete);

module.exports = post;
