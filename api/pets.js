import express from "express";
import db from "#db/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { getPets } from "#db/queries/pets";

router.get("/pets", async (req, res)=>{
    const pets = await getPets();
    res.send(pets);
});