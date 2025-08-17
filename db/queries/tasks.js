import db from "#db/client";
import bcrypt from "bcrypt";

export async function getTasks(){
    const sql = `
    SELECT * FROM tasks;
    `;
    const {rows:tasks} = await db.query(sql);
    return tasks;
}