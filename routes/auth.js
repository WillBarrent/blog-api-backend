const { Router } = require("express");
const { signUp, login, logout } = require("../controllers/auth");
const auth = Router();

auth.post("/sign-up", signUp);
auth.post("/login", login);
auth.post("/logout", logout);

module.exports = auth;
