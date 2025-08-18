const {
  createComment,
  readAllComments,
  updateCommentById,
  deleteCocommentDeletemmentById,
} = require("../models/comment");

const commentCreate = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;

    const comment = await createComment(postId, content);

    res.json({
      msg: "Comment created",
      comment,
    });
  },
];

const commentReadAll = async (req, res) => {
  const comments = await readAllComments();

  res.json({
    comments,
  });
};

const commentUpdate = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { content } = req.body;
    const { commentId } = req.params;

    const comment = await updateCommentById(commentId, content);

    res.json({
      comment: comment,
    });
  },
];

const commentDelete = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { commentId } = req.params;

    await deleteCocommentDeletemmentById(commentId);

    res.json({
      msg: "Commentary has been deleted.",
    });
  },
];

module.exports = {
  commentCreate,
  commentReadAll,
  commentUpdate,
  commentDelete,
};
