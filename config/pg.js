import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todoAPI",
  password: "16122000",
  port: 5432,
});