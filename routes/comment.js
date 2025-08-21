const { Router } = require("express");
const { validateCommentary } = require("../utils/validation");
const {
  commentCreate,
  commentReadAll,
  commentUpdate,
  commentDelete,
} = require("../controllers/comment");
const comment = Router();

// Create Comment

comment.post("/:postId", validateCommentary, commentCreate);

// Read All Comments Of Post

comment.get("/:postId", commentReadAll);

// Update Comment

comment.put("/:commentId", validateCommentary, commentUpdate);

// Delete Comment

comment.delete("/:commentId", commentDelete);

module.exports = comment;
