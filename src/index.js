// require("dotenv").config(); this doesn't look good in ES6
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env"
});
connectDB();








/*
import express from "express";
const app = express();

( async ()=>{
    try{

        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (error) => {
            console.error("Error starting the server", error);  
        });
        app.listen(process.env.PORT, () => {
            console.log(`Server started at port ${process.env.PORT}`);
        });
            
    }
    catch(error){
        console.error("Error connecting to database", error);
    }
} )() // this is known as an IIFE (Immediately Invoked Function Expression)

// this code also works, but we'll use the industry standards
*/