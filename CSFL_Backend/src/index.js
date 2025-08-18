import express from "express";
import apiRouter from "./routes/index.js";
import connectDB from "./config/database.config.js";
process.loadEnvFile();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.use("/api", apiRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});