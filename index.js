import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import users from "./data/users.json" assert { type: "json" };
import posts from "./data/posts.json" assert { type: "json" };
import comments from "./data/comments.json" assert { type: "json" };

const app = express();
const port = 3000;



// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
      axios.get(`http://localhost:3000/api/users`),
      axios.get(`http://localhost:3000/api/posts`),
      axios.get(`http://localhost:3000/api/comments`),
    ]);

    res.render("index.ejs", {
      users: userResponse.data,
      posts: postResponse.data,
      comments: commentResponse.data,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res
      .status(500)
      .json({ message: "Error fetching data", details: error.message });
  }
});

// Create a new user
app.post("/api/users", (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Route to render the create user page
app.get("/new-user", (req, res) => {
  res.render("user.ejs");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
