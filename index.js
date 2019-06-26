const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const server = express();
const db = require("./database/connection");
const itemRouter = require("./routes/item");
// Define user and password for connection
dotenv.config();
// console.log(process.env);

// Body Parser for view req.body
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// CORS

// Connect to DB
mongoose
  .connect(db.connection, {
    useNewUrlParser: true
  })
  .then(conn => {
    console.log("Connection Established");
  })
  .catch(err => {
    console.log(db);
    console.log({
      error: {
        name: err.name,
        message: err.message,
        errorCode: err.code,
        codeName: err.codeName
      }
    });
  });

// Middleware
server.use((req, res, next) => {
  // What we want to allow
  res.header("Access-Control-Allow-Origin", "*");
  // What kind of headers we are allowing
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // Check for the options requested from browsers
  if (req.method === "OPTIONS") {
    // Tell the browser whhat he can ask for
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");

    // Respond with ok status code
    return res.status(200).json({
      message: "ok"
    });
  }
  next();
});

// Routing for items API

server.use("/api/v1/items", itemRouter);

// For unkown routes , 404 error
server.use((req, res, next) => {
  const error = new Error("Unable to manage request");

  // set error status code 404
  error.status = 404;
  // Forward the request with the error
  next(error);
});

server.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || "Internal server error"
    }
  });
});

// Server listening
server.listen(PORT, console.log(`Server is running at port : ${PORT}`));
