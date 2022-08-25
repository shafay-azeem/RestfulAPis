const express = require("express");
const app = express();
const studentRoute = require("./api/route/student");
const facultyRoute = require("./api/route/faculty");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect(
  "mongodb+srv://Shafay:shafay123@cluster0.o8604c8.mongodb.net/?retryWrites=true&w=majority"
);

mongoose.connection.on("error", (err) => {
  console.log("connection not established");
});

mongoose.connection.on("connected", (connected) => {
  console.log("connected with db ");
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/student", studentRoute);

app.use("/faculty", facultyRoute);

app.use((req, res, next) => {
  res.status(404).json({
    error: "Bad URL Request ",
  });
});

module.exports = app;
