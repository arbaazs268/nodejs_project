const express = require("express");
const router = express.Router();
const { Course, validate } = require("../models/coursesModel");
const { Category } = require("../models/categoriesModel");

router.get("/", async (req, res) => {
  let course = await Course.find();
  res.send(course);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid ID");

  const course = new Course({
    title: req.body.title,
    category: { _id: category.id, name: category.name },
    creator: req.body.creator,
    rating: req.body.rating,
  });
  await course.save();
  res.send(course);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid ID");

  const course = await Course.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      category: { _id: category.id, name: category.name },
      creator: req.body.creator,
      rating: req.body.rating,
    },
    { new: true }
  );
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  res.send(course);
});

router.delete("/:id", async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course)
    return res.status(404).send("the genre with the given ID was not found");
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).send("can not find course by this id");
  res.send(course);
});

module.exports = router;
