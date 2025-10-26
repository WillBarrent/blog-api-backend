const prisma = require("./db");

const createPost = async function (userId, title, content) {
  const post = await prisma.post.create({
    data: {
      authorId: Number(userId),
      title: title,
      content: content,
    },
  });

  return post;
};

const readPostById = async function (postId) {
  const post = await prisma.post.findFirst({
    where: {
      id: Number(postId),
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      published: true,
      author: {
        select: {
          username: true,
        },
      },
    },
  });

  return post;
};

const readAllPosts = async function () {
  const posts = await prisma.post.findMany();

  return posts;
};

const updatePostById = async function (postId, title, content, published) {
  const post = await prisma.post.update({
    where: {
      id: Number(postId),
    },
    data: {
      title: title,
      content: content,
      published: published,
    },
  });

  return post;
};

const deletePostById = async function (postId) {
  const post = await prisma.post.delete({
    where: {
      id: Number(postId),
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
