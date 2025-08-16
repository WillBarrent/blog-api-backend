const { PrismaClient } = require("../generated/prisma");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const signUp = async function (req, res) {
  const { username, email, password } = req.body;

  const prisma = new PrismaClient();

  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });

  res.json({
    msg: "User has been created successfully.",
    user: user,
  });
};

const login = async function (req, res) {
  const { username, email, password } = req.body;

  const prisma = new PrismaClient();

  const user = await prisma.user.findFirst({
    where: {
      username: username,
      email: email,
    },
  });

  if (!user) {
    return res.status(401).json({
      msg: "No user found.",
    });
  }

  if (user.password !== password) {
    return res.status(401).json({
      msg: "Password is not correct",
    });
  }

  const payload = { userId: user.id };

  jwt.sign(payload, "secret", (err, token) => {
    res.json({
      token,
    });
  });
};

const logout = [
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req);

    res.json({
      msg: "Logout successfully",
    });
  },
];

module.exports = {
  signUp,
  login,
  logout,
};
