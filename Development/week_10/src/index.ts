import { Client } from 'pg';

const client = new Client({
  connectionString: "postgresql://user_owner:npg_AcsI4xUu1mat@ep-quiet-dream-a4edhghm-pooler.us-east-1.aws.neon.tech/user?sslmode=require"
});

async function createUserTable() {
  try {
    await client.connect();

    await client.query(`
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

    const insertResult = await client.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;`,
      [username, email, password]
    );

    console.log("Inserted user:", insertResult.rows[0]);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
}

createUserTable();
