DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS pets CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL, 
    password TEXT NOT NULL
);



CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    note TEXT NOT NULL,
    imageURL TEXT,
    user_id INTEGER NOT NULL REFERENCES users(id)
);



CREATE TABLE tasks (
    id SERIAL PRIMARY KEY, 
    title TEXT NOT NULL,
    description TEXT NOT NULL, 
    datetime DATE NOT NULL,
    pet_id INTEGER NOT NULL REFERENCES pets(id)
);