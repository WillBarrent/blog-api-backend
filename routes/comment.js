const { Router } = require("express");
const comment = Router();

// Create Comment

comment.comment("/", () => {});

// Read All Comments Of Post

comment.get("/:postId", () => {});

// Update Comment

comment.put("/:commentId", () => {});

// Delete Comment

comment.delete("/:commentId", () => {});

module.exports = comment;