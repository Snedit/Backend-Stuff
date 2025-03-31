import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app =  express();

//  first we do some configurations
//  allowing cross origin resource sharing
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// setting a limit on the size of json to be accepted
app.use(express.json({
    limit: "16kb" // this sets a limit to the size of the json request
}))


// setting url encoding for standards
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

// allows storing static files in public
app.use(express.static("public"))

// cookie parser
app.use(cookieParser())
// a req is handled like this app.use((err, req, res, next) => {})



// routes import 
import userRouter from "./routes/user.routes.js";

// routes declaration
// important: we used to write app.get() but now we use app.use() because we are using a router
// so we need a middleware to handle the routes
// naming convention for routes is /api/v1/...
app.use("/api/v1/users", userRouter)


export {app};
