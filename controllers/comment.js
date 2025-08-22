const {
  createComment,
  readAllComments,
  updateCommentById,
  deleteCommentById,
} = require("../models/comment");

const passport = require("passport");

const commentCreate = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.json(errors);
      }

      const { postId } = req.params;
      const { content } = req.body;

      const comment = await createComment(postId, content);

      res.json({
        msg: "Comment created",
        comment,
      });
    } catch (e) {
      next(e);
    }
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
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.json(errors);
      }

      const { content } = req.body;
      const { commentId } = req.params;

      const comment = await updateCommentById(commentId, content);

      res.json({
        comment: comment,
      });
    } catch (e) {
      next(e);
    }
  },
];

const commentDelete = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { commentId } = req.params;

    await deleteCommentById(commentId);

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
