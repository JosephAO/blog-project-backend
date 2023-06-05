const express = require("express");
const postsRouter = require("./posts");

const router = express.Router({ mergeParams: true });

router
	.route("/")
	.get((req, res) => {
		const postId = parseInt(req.params.postId);
		if (!postsRouter.postList) {
			res.status(404).json({ error: "Post not found" });
		} else {
			const post = postsRouter.postList.find((post) => post.id === postId);
			res.status(200).json(post.comments);
		}
	})
	.post((req, res) => {
		const postId = parseInt(req.params.postId);
		const { text, author, type, parentId } = req.body;
		const post = postsRouter.postList.find((post) => post.id === postId);
		if (!post) {
			res.status(404).json({ error: "Post not found" });
		} else {
			let nextId = post.comments.length > 0 ? post.comments[post.comments.length - 1].id + 1 : 1;
			const newComment = {
				id: nextId,
				text,
				type,
				parentId,
				author,
				timestamp: Date.now()
			};
			post.comments.push(newComment);
			res.status(201).json(newComment);
		}
	});

router
	.route("/:commentId")
	.put((req, res) => {
		const postId = parseInt(req.params.postId);
		const commentId = parseInt(req.params.commentId);
		const { text } = req.body;

		const post = postsRouter.postList.find((post) => post.id === postId);
		if (!post) {
			res.status(404).json({ error: "Post not found" });
		} else {
			const comment = post.comments.find((comment) => comment.id === commentId);
			if (!comment) {
				res.status(404).json({ error: "Comment not found" });
			} else {
				comment.text = text;
				res.json(comment);
			}
		}
	})
	.delete((req, res) => {
		const postId = parseInt(req.params.postId);
		const commentId = parseInt(req.params.commentId);

		const post = postsRouter.postList.find((post) => post.id === postId);
		if (!post) {
			res.status(404).json({ error: "Post not found" });
		} else {
			const index = post.comments.findIndex((comment) => comment.id === commentId);
			if (index === -1) {
				res.status(404).json({ error: "Comment not found" });
			} else {
				const deletedComment = post.comments.splice(index, 1);
				res.json(deletedComment[0]);
			}
		}
	});

module.exports = router;
