import express from "express";
const app = express();
export default app;
import cors from "cors";
import usersRouter from "./api/users.js";





app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);

app.use((err, req, res, next)=>{
    console.error(err);
    res.status(500).json(`Sorry! Something went wrong!`);
});

