const express = require("express");
const categories = require("./Routes/categories");
const students = require("./Routes/students")
const course = require("./Routes/courses")
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/learningPlatform")
  .then(() => console.log("connected to database"))
  .catch((err) => console.error("couldnt connect to mongodb", err));

app.use(express.json());
app.use("/api/categories",categories);
app.use("/api/students",students)
app.use("/api/course",course)
app.listen(3000, function () {
  console.log("RUNNING ON PORT NUMBER 3000");
});
