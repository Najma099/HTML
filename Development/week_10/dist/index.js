"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./generated/prisma");
const prisma = new prisma_1.PrismaClient();
function createUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.create({
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
    });
}
createUser();
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
