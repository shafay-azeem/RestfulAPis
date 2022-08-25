const express = require("express");
const router = express.Router();
const Student = require("../model/student");
const mongoose = require("mongoose");
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "this is student get request",
  });
});

//POST RECORDS
router.post("/addrecords", (req, res, next) => {
  const student = new Student({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    phone: req.body.phone,
  });

  student
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        newStudent: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });

  // console.log(req.body);
  // res.status(200).json({
  //   message: "this is student post request",
  // });
});

//GET ALL RECORDS
router.get("/getallstudents", (req, res, next) => {
  Student.find()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        studentData: result,
      });
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//GET RECORDS BY ID
router.get("/getstudentbyid/:id", (req, res, next) => {
  console.log(req.params.id);

  Student.findById(req.params.id)
    .then((result) => {
      res.status(200).json({
        studentData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//DELETE RECORD BY ID
router.delete("/deleterecordbyid/:id", (req, res, next) => {
  Student.remove({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "successfully deleted",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//UPDATE RECORD BY ID
router.put("/updaterecordbyid/:id", (req, res, next) => {
  Student.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        message: "Successfully Updated",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});
module.exports = router;
