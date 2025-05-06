import { PrismaClient } from "./generated/prisma";
const prisma = new PrismaClient();

async function createUser() {
  const user = await prisma.user.create({
    data: {
      email: "najmakhatun099@gmail",
      firstName: "najma",
      lastName: "khatun",
      password: "765abcd"
    },
    select: {
      email: true,
      firstName: true
    }
  });
}
createUser()













// import { Client } from 'pg';

// const client = new Client({
//   connectionString: "postgresql://neondb_owner:npg_gLMEsJt23KnA@ep-frosty-sky-a4f7cg7b-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
// });
// client.connect();

// async function createUserTable() {
//   try {
//     await client.query(`
//       CREATE TABLE IF NOT EXISTS users (
//           id SERIAL PRIMARY KEY,
//           username VARCHAR(50) UNIQUE NOT NULL,
//           email VARCHAR(255) UNIQUE NOT NULL,
//           password VARCHAR(255) NOT NULL,
//           created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//       );
//     `);
//     console.log("Table ensured.");

//     // Insert user data (example)
//     const username = 'najma';
//     const email = 'najma@example.com';
//     const password = 'secure123';

//     const insertResult = await client.query(
//       `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;`,
//       [username, email, password]
//     );

//     console.log("Inserted user:", insertResult.rows[0]);
//   } catch (err) {
//     console.error("Error:", err);
//   } finally {
//     await client.end();
//   }
// }

// createUserTable();
