import mongoose from "mongoose";
import express from "express";
import { isAdmin, isAuthenticated, isMasterAdmin } from "../../validation/index.js";
import expressAsyncHandler from "express-async-handler";
import UserController from "../../controllers/UserController.js";
const users = express.Router()
users.post("/create-new-account", expressAsyncHandler(UserController.add));
users.post(
  "/add-new-account",
  isAuthenticated,
  isMasterAdmin,
  expressAsyncHandler(UserController.add)
);
users.get(
  "/",
  isAuthenticated,
  isAdmin,
  expressAsyncHandler(UserController.getAll)
);
users.delete("/:id", isAuthenticated, isAdmin, expressAsyncHandler(UserController.delete));
users.put("/:id/profile", isAuthenticated, expressAsyncHandler(UserController.modify));
users.put("/:id", isAuthenticated,isAdmin, expressAsyncHandler(UserController.access));
export default users