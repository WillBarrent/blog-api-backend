const passport = require("passport");
const {
  createPost,
  readPostById,
  readAllPosts,
  updatePostById,
  deletePostById,
} = require("../models/post");
const { validationResult } = require("express-validator");
const { deleteAllPostComments } = require("../models/comment");

const postCreate = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.json(errors);
      }

      const userId = req.user.userId;
      const { title, content } = req.body;

      await createPost(userId, title, content);

      res.json({
        msg: "Post created",
      });
    } catch (e) {
      next(e);
    }
  },
];

const postRead = async (req, res) => {
  const { postId } = req.params;

  const post = await readPostById(postId);

  res.json({
    post,
  });
};

const postReadAll = async (req, res) => {
  const posts = await readAllPosts();

  res.json({
    posts,
  });
};

const postUpdate = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.json(errors);
      }

      const { postId } = req.params;
      const { title, content, published } = req.body;

      const post = await updatePostById(postId, title, content, published);

      res.json({
        post,
      });
    } catch (e) {
      next(e);
    }
  },
];

const postDelete = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { postId } = req.params;

    await deleteAllPostComments(postId);
    await deletePostById(postId);

    res.json({
      msg: "Post has been deleted.",
    });
  },
];

module.exports = {
  postCreate,
  postRead,
  postReadAll,
  postUpdate,
  postDelete,
};
