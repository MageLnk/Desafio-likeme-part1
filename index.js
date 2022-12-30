const express = require("express");
const cors = require("cors");
require("dotenv").config();
// Basic starting points
const app = express();
const PORT = 3000;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// Tools
const { getPosts, newPost } = require("./controllers/consults");
// Load page
app.get("/", (req, res) => {
  res.status(200).sendFile(`${__dirname}/public/index.html`);
});
// App
app.get("/posts", async (req, res) => {
  const posts = await getPosts();
  res.status(200).send(posts);
});

app.post("/posts", async (req, res) => {
  const { command } = await newPost(req.body);
  res.status(200).send({ msg: "Todo perfecto" });
});

// Listener
app.listen(PORT, () => {
  console.log(`Server runing on port: htttp://localhost:${PORT}. Everything is fine`);
});
