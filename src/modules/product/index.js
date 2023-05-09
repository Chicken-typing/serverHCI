import mongoose from "mongoose";
import express from "express";
import ProductController from "../../controllers/ProductController.js";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuthenticated, isMasterAdmin } from "../../validation/index.js";
const products = express.Router();
products.get('/', expressAsyncHandler(ProductController.getAllProducts))
products.get('/admin', isAuthenticated, isAdmin, expressAsyncHandler(ProductController.getAllProducts))
products.get('/categories', expressAsyncHandler(ProductController.getListProductByCategory))
products.get('/:id', expressAsyncHandler(ProductController.getProductById))
products.get('/slug/:slug', expressAsyncHandler(ProductController.getProductBySlug))
products.post('/', isAuthenticated, isAdmin, expressAsyncHandler(ProductController.createProduct))
products.post('/:id/reviews', isAuthenticated, expressAsyncHandler(ProductController.createReview))
products.put('/:id', isAuthenticated, isAdmin, expressAsyncHandler(ProductController.updateProduct))
products.put('/:id/promotion', isAuthenticated, isAdmin, expressAsyncHandler(ProductController.updatePromotion))
products.delete('/:id', isAuthenticated, isAdmin, expressAsyncHandler(ProductController.deleteProduct))
products.delete('/:prodId/reviews/:id', isAuthenticated, isAdmin, expressAsyncHandler(ProductController.deleteReview))
export default products;
