const { Router } = require("express");
const { signUp, login, logout } = require("../controllers/auth");
const { validateUser } = require("../utils/validation");
const auth = Router();

auth.post("/sign-up", validateUser, signUp);
auth.post("/login", login);
auth.post("/logout", logout);

module.exports = auth;
