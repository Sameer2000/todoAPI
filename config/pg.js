import pg from "pg";
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todoAPI",
  password: process.env.PASSWORD,
  port: 5432,
});