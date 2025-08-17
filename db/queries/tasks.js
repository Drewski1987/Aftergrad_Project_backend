import db from "#db/client";
import bcrypt from "bcrypt";

export async function createTasks({title, description, dateTime, pet_id}) {
    const sql = `
    INSERT INTO tasks (title, description, dateTime, pet_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;
    const {rows:task} = await db.query(sql, [title, description, dateTime, pet_id]);
    return task[0];
}

export async function getTasks(){
    const sql = `
    SELECT * FROM tasks;
    `;
    const {rows:tasks} = await db.query(sql);
    return tasks;
}