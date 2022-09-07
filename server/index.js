const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
dotenv.config();

//importing routes
const authroute = require("./routes/auth"); //saperated auth from users as it will contain all the jwt and cookies stuff
const hotelsroute = require("./routes/hotels");
const roomsroute = require("./routes/rooms");
const usersroute = require("./routes/users");

//database connection
try {
    mongoose.connect(process.env.MONGODB)
        .then(()=> console.log("connected to db"));
  } catch (error) {
    console.log("error occured while connecting to mongo db: "+error);
  }

const PORT = 80;

//middlewares 

//this will run before the req and res of the router 
//it will contain a next call back function which will run whenever the next function is called in the crud requests.
// it is just like a remote procedure call.
// app.use((req, res, next)=>{
//   console.log("hi!, I am from middleware");
//   next(); //we are calling this function here only so that it visits this middleware first.
// })

//error handling middleware

app.use((err, req, res, next)=>{
  const errorStatus = err.status || 500;
  const errorMsg = err.msg || "something went wrong!";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus, 
    message: errorMsg,
    stack: err.stack
  });//will execute whenever any error occurs
});

//for accepting the post request body.
app.use(express.json());


// - for express.Router();
app.use("/auth", authroute);
app.use("/hotels", hotelsroute);
app.use("/rooms", roomsroute);
app.use("/users", usersroute);

//for cookies
app.use(cookieParser());

app.listen(PORT, ()=>{
    console.log("Server running on port: "+PORT);
});