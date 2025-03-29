import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () =>{
try{
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`Connected to database. DB HOST : ${connectionInstance.connection.host}`);
}
catch(err){
console.log("error occured connecting to MONGODB", err);
process.exit(1);
}
}

export default connectDB;