import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todoAPI",
  password: "16122000",
  port: 5432,
});

const createTask = async (req, res) => {
  const { task, status } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO todo (task, status) VALUES ($1, $2) RETURNING *",
      [task, status]
    );
    res.status(201).json(result.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating item in database.");
  }
};

const getTasks = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM todo");
    res.status(200).json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving items from database.");
  }
};

const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM todo WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).send("Item not found.");
    }
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving item from database.");
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    const result = await pool.query(
      "DELETE FROM todo WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      res.status(404).send(`Task with id ${id} not found.`);
    } else {
      res.status(200).json(result.rows[0]);
    }
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting task from database.");
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { task, status } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      "UPDATE todo SET task = $1, status = $2 WHERE id = $3 RETURNING *",
      [task, status, id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).send("Item not found.");
    }
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating item in database.");
  }
};

export default { createTask, getTasks, getTask, deleteTask, updateTask };
