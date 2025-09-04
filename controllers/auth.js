const jwt = require("jsonwebtoken");
const passport = require("passport");
const { createUser, findUser } = require("../models/auth");
const { hashPassword, verifyPassword } = require("../utils/password");
const { validationResult } = require("express-validator");

const signUp = async function (req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json(errors);
    }

    const { username, email, password } = req.body;

    const hashedPassword = await hashPassword(password);

    await createUser(username, email, hashedPassword);

    res.json({
      msg: "User has been created successfully.",
    });
  } catch (e) {
    next(e);
  }
};

const login = async function (req, res) {
  const { username, email, password } = req.body;

  const user = await findUser(username, email);

  if (!user) {
    return res.status(401).json({
      msg: "No user found.",
    });
  }

  const isPasswordCorrect = await verifyPassword(user.password, password);
  const isAuthor = user.author;

  if (!isPasswordCorrect) {
    return res.status(401).json({
      msg: "Password is not correct",
    });
  }

  const payload = { userId: user.id };

  jwt.sign(payload, "secret", (err, token) => {
    res.json({
      token,
      username,
      isAuthor,
    });
  });
};

const logout = [
  passport.authenticate("jwt", { session: false }),
  (req, res) => {


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
