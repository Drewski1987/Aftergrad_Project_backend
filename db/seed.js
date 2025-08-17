import db from "./client.js";
import { createUser } from "./queries/users.js";
import {createPets} from "./queries/pets.js";
import {createTasks} from "./queries/tasks.js";
await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // seed users
  await createUser({ username: "JohnDoe", password: "abc123" });
  await createUser({ username: "JaneDoe", password: "cba321" });

  // seed pets
  await createPets({
    name: "Jorden",
    note: "Brown kitten full of love and energy, full of Life",
    imageURL:
      "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D",
      user_id: 1
  })
  await createPets({
    name: "Mittens",
    note: "White kitten eager for attention, highly curious, and seeking love!",
    imageURL: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
    user_id: 2
  })
  await createPets({
    name: "Mr. Paw",
    note: "Brown white with stripes, always ready to swing his paws on whomever wants to test his gangsta!",
    imageURL: "https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg",
    user_id: 3
  })

//   seed Tasks

  await createTasks({
    title: "Bath Time",
    description: "Make sure to give this pet a good bath before his/her bedtime!",
    dateTime: "08/12/2025 9:00pm",
    pet_id: 1 
  })
  await createTasks({
    title: "Dinner",
    description: "Have enough dry food with some added water to moist, in his/her bowl!",
    dateTime: "08/13/2025 7:00pm",
    pet_id: 2
  })
}
