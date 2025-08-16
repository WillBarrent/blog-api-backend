require("dotenv").config();

const express = require("express");
const app = express();
const auth = require("./routes/auth");
const post = require("./routes/post");
const comment = require("./routes/comment");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./passport");

app.use("/api/auth", auth);
app.use("/api/posts", post);
app.use("/api/comments", comment);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("App is listening on PORT", PORT);
});
