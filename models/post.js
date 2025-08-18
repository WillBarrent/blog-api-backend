const prisma = require("./db");

const createPost = async function (userId, title, content) {
  const post = await prisma.post.create({
    data: {
      authorId: userId,
      title: title,
      content: content,
    },
  });

  return post;
};

const readPostById = async function (postId) {
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });

  return post;
};

const readAllPosts = async function () {
  const posts = await prisma.post.findMany();

  return posts;
};

const updatePostById = async function (postId, title, content) {
  const post = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      title: title,
      content: content,
    },
  });

  return post;
};

const deletePostById = async function (postId) {
  const post = await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  return post;
};

module.exports = {
  createPost,
  readPostById,
  readAllPosts,
  updatePostById,
  deletePostById,
};
