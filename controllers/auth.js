const jwt = require("jsonwebtoken");
const passport = require("passport");
const { createUser, findUser } = require("../models/auth");

const signUp = async function (req, res) {
  const { username, email, password } = req.body;

  await createUser(username, email, password);

  res.json({
    msg: "User has been created successfully.",
  });
};

const login = async function (req, res) {
  const { username, email, password } = req.body;

  const user = await findUser(username, email);

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

  console.log(payload);

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
