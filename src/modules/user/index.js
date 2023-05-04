import mongoose from "mongoose";
import express from "express";
import { isAdmin, isAuthenticated, isMasterAdmin } from "../../validation";
import expressAsyncHandler from "express-async-handler";
import UserController from "../../controllers/UserController";
const router = express.Router()
router.post("/create-new-account", expressAsyncHandler(UserController.add));
router.post(
  "/add-new-account",
  isAuthenticated,
  isMasterAdmin,
  expressAsyncHandler(UserController.add)
);
router.get(
  "/",
  isAuthenticated,
  isAdmin,
  expressAsyncHandler(UserController.getAll)
);
router.delete("/:id", isAuthenticated, isAdmin, expressAsyncHandler(UserController.delete));
router.put("/:id/profile", isAuthenticated, expressAsyncHandler(UserController.modify));
router.put("/:id", isAuthenticated,isAdmin, expressAsyncHandler(UserController.access));
module.exports= router