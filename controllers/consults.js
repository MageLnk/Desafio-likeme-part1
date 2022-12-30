const { Pool } = require("pg");

const credentials = {
  host: "localhost",
  user: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "password",
  database: "likeme",
  allowExitOnIdle: true,
};
const pool = new Pool(credentials);

const getPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

const newPost = async ({ titulo, url, descripcion, likes }) => {
  const consult = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)";
  const values = [titulo, url, descripcion, likes];
  const result = await pool.query(consult, values);
  return result;
};

module.exports = { getPosts, newPost };
