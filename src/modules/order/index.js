import mongoose from "mongoose";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import OrderController from "../../controllers/OrderController.js";
import { isAdmin, isAuthenticated } from "../../validation";
const orders = express.Router();
orders.get("/",isAuthenticated,isAdmin, expressAsyncHandler(OrderController.getAll));
orders.get("/:id",isAuthenticated, expressAsyncHandler(OrderController.getOne));
orders.get(
  "/mine",
  isAuthenticated,
  expressAsyncHandler(OrderController.getMine)
);
orders.post("/",isAuthenticated, expressAsyncHandler(OrderController.create));
orders.put("/:id/delivery",isAuthenticated, expressAsyncHandler(OrderController.delivery));
orders.put("/:id/payment", isAuthenticated, expressAsyncHandler(OrderController.payment));
orders.delete("/:id", isAuthenticated, isAdmin,expressAsyncHandler(OrderController.delete));

export default orders;
