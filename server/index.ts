import express from "express";
import dotenv from "dotenv";
import dbConnect from "./connection/dbConnect";
import todoRoutes from "./routes/todoRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();
dbConnect();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/todos", todoRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
