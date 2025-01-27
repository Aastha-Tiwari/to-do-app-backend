import express from "express";
import "dotenv/config";
import cors from "cors";

import connectDB from "./config/mongoose.config.js";
import toDoRouter from "./Routes/todo.router.js";
import userRouter from "./Routes/user.router.js";

const app = express();

app.use(express.json());
app.use(cors());

// Connecting with database
connectDB();

const PORT = process.env.PORT || 3000;

// Api End points
app.use('/api/toDo' , toDoRouter);
app.use('/api/user' , userRouter);

app.get('/' , (req , res)=>{
    res.send("API Working");
});

// Server listening at a PORT
app.listen(PORT , ()=>{
    console.log("Server is listening at port ", PORT);
});
