import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger);

// Routes

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
    res
      .status(500)
      .json({ message: "Error fetching data", details: error.message });
  }
});

app.post("/new-user", async (req, res) => {
  try {
    await axios.post(`${API_URL}/api/users`, req.body);
    res.redirect("/");
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Error creating user", details: error.message });
  }
});

app.post("/delete-user/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/api/users/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ message: "Error deleting user", details: error.message });
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
