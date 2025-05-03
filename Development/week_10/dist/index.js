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
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: "postgresql://user_owner:npg_AcsI4xUu1mat@ep-quiet-dream-a4edhghm-pooler.us-east-1.aws.neon.tech/user?sslmode=require"
});
function createUserTable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            // Create table if it doesn't exist
            yield client.query(`
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
            console.log("Table ensured.");
            // Insert user data (example)
            const username = 'najma';
            const email = 'najma@example.com';
            const password = 'secure123';
            const insertResult = yield client.query(`INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;`, [username, email, password]);
            console.log("Inserted user:", insertResult.rows[0]);
        }
        catch (err) {
            console.error("Error:", err);
        }
        finally {
            yield client.end();
        }
    });
}
createUserTable();
