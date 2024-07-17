import express from "express";
const router = express.Router();

const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  // Add more users here
];

// Get all users
router.get("/", (req, res) => {
  res.json(users);
});

// Add a new user
router.post("/", (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Delete a user
router.delete("/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export default router;