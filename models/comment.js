const prisma = require("./db");

const createComment = async function (postId, content, username) {
  const comment = await prisma.comment.create({
    data: {
      content: content,
      postId: Number(postId),
      username: username,
    },
  });

  const post = await prisma.post.update({
    where: {
      id: Number(postId),
    },
    data: {
      comments: {
        connect: {
          id: comment.id,
        },
      },
    },
  });

  return post;
};

const readAllComments = async function (postId) {
  const comments = await prisma.comment.findMany({
    where: {
      postId: Number(postId),
    },
  });

  return comments;
};

const updateCommentById = async function (commentId, content) {
  const comment = await prisma.comment.update({
    where: {
      id: Number(commentId),
    },
    data: {
      content: content,
    },
  });

  return comment;
};

const deleteCommentById = async function (commentId) {
  await prisma.comment.delete({
    where: {
      id: Number(commentId),
    },
  });
};

const deleteAllPostComments = async function (postId) {
  await prisma.comment.deleteMany({
    where: {
      postId: Number(postId),
    },
  });
};

module.exports = {
  createComment,
  readAllComments,
  updateCommentById,
  deleteCommentById,
  deleteAllPostComments,
};
