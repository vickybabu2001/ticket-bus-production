const express = require("express");
const app = express();
const pdf = require('html-pdf');
const nodemailer = require('nodemailer');
const fs = require('fs');
const moragan = require("morgan");
require("dotenv").config();
const connectDB =require("./config/db");
const cors = require("cors"); 
const path = require("path");
const authRoute =require("./routes/authRoute");
const ticketRoute =require("./routes/ticketRoute");
const busRoutes =require("./routes/busRoutes");
const requireSignin=require("./middlewares/authMiddlewares");
const mailRoute=require("./routes/mailRoute");
 connectDB();
//middelwares
app.use(moragan("dev"));
app.use(cors());
app.use(express.json());
connectDB();
// static files access
app.use(express.static(path.join(__dirname, "./client/build")));
//routes
app.use("/api/users", authRoute);
app.use("/api/buses", busRoutes);
app.use("/api/ticket",ticketRoute);
app.use("/api/mail",mailRoute);

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
  
const port=process.env.PORT || 7000;
 
app.listen(port,()=>{console.log(`Run on ${port}`)});