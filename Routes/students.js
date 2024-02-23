const express = require('express')
const router = express.Router()
const {Student,validate} = require('../models/studentModel')
router.get("/", async (req, res) => {
    let student = await Student.find()
  res.send(student);
});

router.post("/", async (req, res) => {
    const {error} =validate(req.body)
    if(error) res.status(400).send(error.details[0].message)
  const student = new Student({
    name: req.body.name,
    isEnrolled:req.body.isEnrolled,
    Phone:req.body.Phone
  });
  await student.save()
  res.send(student);
});


router.put('/:id',async(req,res)=>{
    const {error} =validate(req.body)
    if(error) res.status(400).send(error.details[0].message)
    const student = await Student.findByIdAndUpdate(req.params.id,{name:req.body.name,Phone:req.body.name,isEnrolled:req.body.name},{new:true})
    if (!student) return res.status(404).send("The student with the given ID was not found")

    res.send(student)
})

router.delete("/:id",async (req,res)=>{
    const student = await Student.findByIdAndDelete(req.params.id)
    if(!student) return res.status(404).send("the genre with the given ID was not found") 
})

router.get("/:id", async(req,res)=>{
    const student = await Student.findById(req.params.id)
    if(!student) return res.status(404).send("can not find course by this id")
    res.send(student)
})


module.exports = router