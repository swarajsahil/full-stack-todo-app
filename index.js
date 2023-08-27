import express from "express";
import {config} from "dotenv";
import bodyParser from "body-parser";
import userRouter from "./routes/user.js";
import { databaseConnected } from "./data/database.js";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js";
import ErrorHandler, {errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
const app=express();
config({
    path:"./data/config.env"
})
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);
app.use(errorMiddleware);
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));
databaseConnected();


app.listen(process.env.PORT,()=>{
    console.log(`server started in ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})