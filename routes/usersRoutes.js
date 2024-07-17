import express from "express";
const router = express.Router();
import users from "../data/users.json" assert { type: "json" }; // Ensure this file exists and has the correct structure

// Get all users
router.get("/", (req, res) => {

  console.log(users);
  res.json(users);
});

// Get user by ID
router.get("/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

let curId = users.length > 0 ? Math.max(...users.map((user) => user.id)) : 0;

// POST: create a new user
router.post("/", (req, res) => {
  const user = {
    id: ++curId,
    name: req.body.name,
    email: req.body.email,
  };
  users.push(user);
  res.status(201).json(user);
});

// PATCH: update a user
router.patch("/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email; // Updated to check email

  res.json(user);
});

// DELETE: remove a specific user by ID
router.delete("/:id", (req, res) => {
  const index = users.findIndex((user) => user.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "User not found" });

  users.splice(index, 1);
  res.json({ message: "User deleted" });
});

export default router;
