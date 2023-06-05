require("dotenv").config();
const port = 5000;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/posts", postsRouter.router);
app.use("/posts/:postId/comments", commentsRouter);

app.get("/", (_req, res) => {
	res.sendStatus(200);
});

app.listen(port, () => {
	console.log(`Server started on port ${port}...`);
});
