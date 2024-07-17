import express from "express";
const router = express.Router();

const posts = [
  { id: 1, userId: 1, content: "This is a post" },
  // Add more posts here
];

// Get all posts
router.get("/", (req, res) => {
  res.json(posts);
});

// Add a new post
router.post("/", (req, res) => {
  const newPost = { id: posts.length + 1, ...req.body };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Update a post
router.put("/:id", (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const postIndex = posts.findIndex((post) => post.id === postId);
  if (postIndex !== -1) {
    posts[postIndex] = { ...posts[postIndex], ...req.body };
    res.json(posts[postIndex]);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

// Delete a post
router.delete("/:id", (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const postIndex = posts.findIndex((post) => post.id === postId);
  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

export default router;
