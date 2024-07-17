import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import users from "./data/users.json" assert { type: "json" };
import posts from "./data/posts.json" assert { type: "json" };
import comments from "./data/comments.json" assert { type: "json" };
import methodOverride from "method-override";

const app = express();
const port = 3000;
const API_URL = `http://localhost:${port}`;

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method")); // Enable method override for DELETE
app.set("view engine", "ejs");

// API routes
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/posts", (req, res) => {
  res.json(posts);
});

app.get("/api/comments", (req, res) => {
  res.json(comments);
});

// Main route
app.get("/", async (req, res) => {
  try {
    const [userResponse, postResponse, commentResponse] = await Promise.all([
      axios.get(`${API_URL}/api/users`),
      axios.get(`${API_URL}/api/posts`),
      axios.get(`${API_URL}/api/comments`),
    ]);

    res.render("index.ejs", {
      users: userResponse.data,
      posts: postResponse.data,
      comments: commentResponse.data,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error fetching data", details: error.message });
  }
});

// Create a new user
app.post("/api/users", (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.redirect("/");
});

// Route to render the create user page
app.get("/new-user", (req, res) => {
  res.render("user.ejs", { submit: "Create User" });
});

// Route to display edit user
app.get("/edit-user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (user) {
    res.render("user.ejs", {
      heading: "Edit User",
      submit: "Update Profile",
      user: user,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Partially update a user
app.post("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.redirect("/");
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Route to handle user deletion
app.delete("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.redirect("/");
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Route to render the create post page
app.get("/new-post", (req, res) => {
  res.render("post.ejs"); // Render the post creation form
});

// Create new post
app.post("/api/posts", async (req, res) => {
  try {
    const newPost = { id: posts.length + 1, ...req.body };
    posts.push(newPost);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// Partially update a post
app.post("/api/posts/:id", async (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === postId);

  if (postIndex !== -1) {
    posts[postIndex] = { ...posts[postIndex], ...req.body };
    res.redirect("/");
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

// Delete a post
app.delete("/api/posts/:id", async (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === postId);

  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
    res.redirect("/");
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
