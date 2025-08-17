import express from "express";
import apiRouter from "./routes/index.js";
import connectDB from "./config/database.config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.use("/api", apiRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});