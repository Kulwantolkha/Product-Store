import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import {connectDB} from './config/db.js';
import mongoose from 'mongoose';
import productRoutes from './routes/Product.routes.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Server is ready.");
})
app.use("/api/products", productRoutes);
app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at localhost: ${PORT}`);
})