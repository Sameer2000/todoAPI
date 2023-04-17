import express from "express";
import bodyParser from "body-parser";
import taskRoutes from "./routes/tasksRoutes.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/tasks", taskRoutes);

app.listen(8000, () => {
  console.log("running on http://localhost:8000");
});
