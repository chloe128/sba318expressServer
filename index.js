import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

// In-memory data for demo purposes
const users = [{ id: 1, name: "User1" }];
const posts = [{ id: 1, userId: 1, content: "This is a post" }];
const comments = [{ id: 1, postId: 1, content: "This is a comment" }];

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
