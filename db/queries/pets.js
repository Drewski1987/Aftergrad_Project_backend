import db from "#db/client";
import bcrypt from "bcrypt";

export async function createPets({name, note, imageUrl, user_id}) {
    const sql = `
    INSERT INTO pets (name, note, imageUrl, user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;
    const {rows:pet} = await db.query(sql, [name, note, imageUrl, user_id]);
    return pet[0]
}

export async function getPets(){
    const sql = `
    SELECT * FROM pets;
    `;
    const {rows:pets} = await db.query(sql);
    return pets;
}