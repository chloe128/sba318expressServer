import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import usersRoutes from "./routes/usersRoutes.js";
//import postsRoutes from "./routes/postsRoutes.js";
//import commentsRoutes from "./routes/commentsRoutes.js";

const app = express();
const port = 3000;

//middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

// Use product routes for API operations
app.use("/users", usersRoutes);
//app.use("/api/posts", postsRoutes);
//app.use("/api/comments", commentsRoutes);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
