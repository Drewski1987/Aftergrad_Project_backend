import express from "express"
const router = express.Router();
export default router;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUsers, createUser } from "../db/queries/users";
import db from "../../db/client";


// validate ID as a positve integer
function isValidId (id) {
    const num = Number(id);
    return Number.isInteger(num) && num > 0;
}

// get /users - get all users
router.get("/", async (req, res)=>{
    const users = await getUsers();
    res.send(users);
});

// Post /user - create new user

router.post("/register", async(req, res)=>{
    const {username, password} = req.body;
    if (!req.body){
        return res.status(400).send({ error: "Missing body"});
    }
    try{
        const hashedPassword = await bcrypt.hash(password, 5)
        const result = await db.query(`INSERT INTO users (username, password) 
            VALUES ($1, $2) RETURNING *;`, [username, hashedPassword]);
            const newUser = result.rows[0]
            if(!newUser){
            return res.status(400).send("Can not create new user")
        };

            const token = jwt.sign({id: newUser.id, username: newUser.username}, process.env.JWT_SECRET);
            res.status(201).json(token)
        }   catch(error){
            console.log(error)
            res.send("Error registering")
            }
    });

router.post("/login", async(req,res,next)=>{
    const {username, password} = req.body;
    if (!username || !password){
        return res.status(400).send("Incorrect login info")
    }
    const correctUserInfo = await getUser ({username})
    const correctMatch = await bcrypt.compare(password, correctUserInfo.password)

    if(!correctMatch){
        return res.status(401).send("Incorrect login information")
    }
    const token = jwt.sign({id: correctUserInfo.id, username: correctUserInfo.username}, process.JWT_SECRET)
    res.status(200).send(token)
})