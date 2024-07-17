import express from "express";
const router = express.Router();

const comments = [
  { id: 1, postId: 1, content: "This is a comment" },
  // Add more comments here
];

// Get all comments
router.get("/", (req, res) => {
  res.json(comments);
});

// Add a new comment
router.post("/", (req, res) => {
  const newComment = { id: comments.length + 1, ...req.body };
  comments.push(newComment);
  res.status(201).json(newComment);
});

// Update a comment
router.put("/:id", (req, res) => {
  const commentId = parseInt(req.params.id, 10);
  const commentIndex = comments.findIndex(
    (comment) => comment.id === commentId
  );
  if (commentIndex !== -1) {
    comments[commentIndex] = { ...comments[commentIndex], ...req.body };
    res.json(comments[commentIndex]);
  } else {
    res.status(404).json({ message: "Comment not found" });
  }
});

// Delete a comment
router.delete("/:id", (req, res) => {
  const commentId = parseInt(req.params.id, 10);
  const commentIndex = comments.findIndex(
    (comment) => comment.id === commentId
  );
  if (commentIndex !== -1) {
    comments.splice(commentIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Comment not found" });
  }
});

export default router;
