import express from "express"
const router = express.router();
export default router;
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

// 