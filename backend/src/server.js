import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

//const express = require("express");{used for common js module type}

dotenv.config();

const app = express () ;
const PORT = process.env.PORT || 5001 ;



//console.log(process.env.MONGO_URI); //to see the value of mongodb password

//MIDDLE WARE
app.use(
  cors({
    origin:"http://localhost:5173",
  })
);
app.use(express.json()); // this middle ware will parse json bodies:req.body
app.use(rateLimiter);

// our simple custom middleware
//app.use((req,res,next) => {
//    console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//    next();
//});

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(5001, () => {
      console.log("server started on PORT:", PORT);
  });
});
