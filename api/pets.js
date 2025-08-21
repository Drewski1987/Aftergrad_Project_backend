import express from "express";
import db from "#db/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { getPets } from "#db/queries/pets";



router.post("/pets", async (req, res, next)=>{
    const {name, note, imageUrl, user_id} = req.body

    if (!name || !note || !imageUrl || !user_id) {
        return res.status(400).send("Missing required body")
    }
    const newPet = await createPet ({
        name: name,
        note: note,
        imageUrl: imageUrl,
        user_id: req.user.id
    })
    res.status(200).send(newPet);
});

router.get("/pets", async (req, res, next)=>{
    const pets = await getPets({user_id: req.user.id});
    res.status(200).send(pets);
});

router.post("/:id")

