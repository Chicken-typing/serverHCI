import mongoose from "mongoose";
import express from "express";
import ProductController from "../../controllers/ProductController";
const router = express.Router();
router.get('/',ProductController.getAllProducts)
module.exports= router;
