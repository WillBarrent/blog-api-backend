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

module.exports = {
    createPost
};
