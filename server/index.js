const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
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
  
  //middlewares - use middlewares in specific order, because calling next anywhere means you are calling the next available middleware.
  //for cookies
  app.use(cookieParser()); //use it above all the routes
  app.use(cors({
      origin: '*'
  }));
  
  //this will run before the req and res of the router 
  //it will contain a next call back function which will run whenever the next function is called in the crud requests.
  // it is just like a remote procedure call.
  // app.use((req, res, next)=>{
//   console.log("hi!, I am from middleware");
//   next(); //we are calling this function here only so that it visits this middleware first and then next operations present downwards.
// })




//for accepting the post request body.
app.use(express.json());


// - for express.Router();
app.use("/auth", authroute);
app.use("/hotels", hotelsroute);
app.use("/rooms", roomsroute);
app.use("/users", usersroute);

//error handling middleware - isko specially neeche he rakha gaya h, because next() mein use hoga errors.
//aur middlewares mein next() ka matlab next usable middleware pe jump karo downwards direction mein.

app.use((err, req, res, next)=>{
  const errorStatus = err.status || 500;
  const errorMsg = err.message || "something went wrong!";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus, 
    message: errorMsg,
    stack: err.stack
  });//will execute whenever any error occurs, because we will pass err as parameter to next and it accepts err
});

app.listen(PORT, ()=>{
    console.log("Server running on port: "+PORT);
});