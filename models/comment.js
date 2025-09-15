const prisma = require("./db");

const createComment = async function (postId, content) {
  const comment = await prisma.comment.create({
    data: {
      content: content,
    },
  });

  const post = await prisma.post.update({
    where: {
      id: postId,
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

const readAllComments = async function () {
  const comments = await prisma.comment.findMany();

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

module.exports = {
  createComment,
  readAllComments,
  updateCommentById,
  deleteCommentById,
};
