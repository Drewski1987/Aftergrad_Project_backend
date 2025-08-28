import db from "../client.js";
import bcrypt from "bcrypt";


// GET Users
export async function getUsers(){
    const sql = `
    SELECT * FROM users;
    `;
    const {rows:users} = await db.query(sql);
    return users;
}

export async function createUser({username, password}) {
    const hashedPassword = await bcrypt.hash(password, 5)
    const sql = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *;
    `;
    const {rows: user} = await db.query(sql, [username, hashedPassword]);
    return user[0];
};

// Login user
export async function loginUser ({username}) {
    const sql = `
    SELECT * FROM users WHERE username = $1
    `;
    const {rows:user} = await db.query(sql, [username]);
    return user;
};

// getUserbyId

export async function getUserbyId(id){
const sql = `
SELECT * FROM users WHERE id = $1
`;
const {rows:user} = await db.query(sql, [id]);
return user;
};

// updateUser

export async function updateUser({id, username, password}){
    const sql = `
    UPDATE users
    SET username = $1, password = $2
    WHERE id = $3
    RETURNING *;
    `;
    const {rows:user} = await db.query(sql,[username, password, id]);
    return user;
}

//  getUserInfo

export async function getUserInfo({username}){
    const sql = `
    SELECT id FROM users WHERE username = $1
    `;
    const {rows:user} = await db.query(sql, [username]);
    return user[0];
}

//  Delete user

export async function deleteUser(id){
    const sql = `
    DELETE FROM users WITH id = $1
    RETURNING *;
    `;
    const {rows:user} = await db.query(sql, [id]);
    return user[0];
}