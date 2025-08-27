const { Client } = require("pg");
const bcrypt = require("bcryptjs");

const client = new Client({
  user: "user",
  host: "localhost",
  database: "auth_db",
  password: "password",
  port: 5455,
});

async function connectToPostgres() {
  try {
    await client.connect();
    console.log("Conectado ao PostgreSQL com sucesso!");
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL
      );
    `);
  } catch (err) {
    console.error("Erro ao conectar ao PostgreSQL:", err);
  }
}

async function createUserPostgres(email, password) {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const query =
    "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id;";
  const res = await client.query(query, [email, passwordHash]);
  return res.rows[0].id;
}

async function findUserByEmailAndComparePasswordPostgres(email, password) {
  const query = "SELECT password_hash FROM users WHERE email = $1;";
  const res = await client.query(query, [email]);
  if (res.rows.length === 0) {
    return false;
  }
  const passwordHash = res.rows[0].password_hash;
  return await bcrypt.compare(password, passwordHash);
}

module.exports = {
  connectToPostgres,
  createUserPostgres,
  findUserByEmailAndComparePasswordPostgres,
};
