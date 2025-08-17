import express from "express";
import db from "#db/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { getTasks } from "#db/queries/pets";

router.get("/tasks", async (req, res)=>{
    const tasks = await getTasks();
    res.send(tasks);
})