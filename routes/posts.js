const express = require("express");
const router = express.Router();

var postList = [
	// {
	// 	id: 1,
	// 	title: "Hello World",
	// 	content: "It's a song that were singing",
	// 	comments: [{ id: 1, text: "Come on get happy!" }]
	// },
	// { id: 2, title: "Can't Stop", content: "Addicted to the shindig", comments: [] },
	// { id: 3, title: "Istanbul", content: "Not Constantinople", comments: [] }
];

var nextId = 1;

router
	.route("/")
	.get((req, res) => {
		res.status(200).json(postList);
	})
	.post((req, res) => {
		const { title, content, author } = req.body;
		const newPost = {
			id: nextId++,
			title,
			content,
			comments: [],
			author,
			timestamp: Date.now()
		};
		postList.push(newPost);
		res.status(201).json(newPost);
	});

router
	.route("/:id")
	.get((req, res) => {
		const id = parseInt(req.params.id);
		res.status(200).json(
			postList.filter((post) => {
				return post.id === id;
			})
		);
	})
	.put((req, res) => {
		const id = parseInt(req.params.id);
		const { title, content } = req.body;

		let post;
		if (!postList) {
			res.status(404).json({ error: "No posts" });
		} else {
			post = postList.find((post) => post.id === id);
		}

		if (!post) {
			res.status(404).json({ error: "Post not found" });
		} else {
			post.title = title ? title : post.title;
			post.content = content ? content : post.content;
			res.status(201).json(post);
		}
	})
	.delete((req, res) => {
		const id = parseInt(req.params.id);

		let post;
		if (!postList) {
			res.status(404).json({ error: "No posts" });
		} else {
			post = postList.find((post) => post.id === id);
		}

		const index = postList.findIndex((post) => post.id === id);
		if (index === -1) {
			res.status(404).json({ error: "Post not found" });
		} else {
			const deletedPost = postList.splice(index, 1);
			res.status(200).json(deletedPost[0]);
		}
	});

module.exports = { router, postList };
