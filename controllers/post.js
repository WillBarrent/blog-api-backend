const passport = require("passport");
const {
  createPost,
  readPostById,
  readAllPosts,
  updatePostById,
  deletePostById,
} = require("../models/post");

const postCreate = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req.user.userId;
    const { title, content } = req.body;

    await createPost(userId, title, content);

    res.json({
      msg: "Post created",
    });
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
  async (req, res) => {
    const { postId } = req.params;
    const { title, content } = req.body;

    const post = await updatePostById(postId, title, content);

    res.json({
      json,
    });
  },
];

const postDelete = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { postId } = req.params;

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
