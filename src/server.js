import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import route from "./modules/route.js";
dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log(error.message);
  });

const app = express();
app.listen(process.env.PORT, () => {
  console.log(`Listen to port ${process.env.PORT}`);
});
app.use("/api/v2", route);

app.use(cors());
