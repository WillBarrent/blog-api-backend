const passport = require("passport");
const { createPost } = require("../models/post");

const postCreate = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req.user.userId;
    const {title, content} = req.body;

    await createPost(userId, title, content);

    res.json({
      msg: "Post created",
    });
  },
];

const postRead = (req, res) => {};

const postReadAll = (req, res) => {};

const postUpdate = (req, res) => {};

const postDelete = (req, res) => {};

module.exports = {
  postCreate,
  postRead,
  postReadAll,
  postUpdate,
  postDelete,
};
