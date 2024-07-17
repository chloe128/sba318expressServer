import express from "express";
const router = express.Router();
import users from "../data/users.json" assert { type: "json" };

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

app.delete("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.redirect("/"); // Redirect after deletion
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export default router;
