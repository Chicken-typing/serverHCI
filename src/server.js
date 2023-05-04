import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import route from "./modules/route.js";
import connectDatabase from "./app/config/database.js";
dotenv.config();
connectDatabase();
const app = express();
app.listen(process.env.PORT, () => {
  console.log(`Listen to port ${process.env.PORT}`);
});
route(app)
app.use(cors());
