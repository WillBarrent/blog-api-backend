const prisma = require("./db");

const createUser = async function (username, email, password) {
  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });

  return user;
};

const findUser = async function (username, email) {
  const user = await prisma.user.findFirst({
    where: {
      username: username,
      email: email,
    },
  });

  return user;
};

const findUserById = async function (userId) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  return user;
};

module.exports = {
  createUser,
  findUser,
  findUserById
};
