import db from "#db/client";
import bcrypt from "bcrypt";

export async function createPets({name, note, imageUrl, user_id}) {
    const sql = `
    INSERT INTO pets (name, note, imageUrl, user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;
    const {rows:pets} = await db.query(sql, [name, note, imageUrl, user_id]);
    return pets[0]
}

export async function getPets({user_id}){
    const sql = `
    SELECT * FROM pets WHERE user_id = $1;
    `;
    const {rows:pets} = await db.query(sql, [user_id]);
    return pets[0];
}

// export async function getPet(id){
//     const sql = `
//     SELECT * FROM pets WHERE id = $1
//     `;
//     const {rows: pet} = await db.query(sql, [id])
//     return pet[0];
// }

export async function updatePet ({name, note, imageUrl, user_id}){
    const sql = `
    UPDATE pets
    SET name = $1, note = $2, imageUrl = $3, 
    WHERE user_id = $4
    RETURNING *; 
    `;
    const {rows: pet} = await db.query(sql, [name, note, imageUrl, user_id])
    return pet;
    
}