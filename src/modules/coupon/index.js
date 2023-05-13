import mongoose from "mongoose";
import CouponController from "../../controllers/CouponController";
import expressAsyncHandler from 'express-async-handler'
import express from "express";
import { isAdmin, isMasterAdmin } from "../../validation";
const coupons = express.Router()
coupons.get("/", expressAsyncHandler(CouponController.getAllCounpon))
coupons.get("/:code", expressAsyncHandler(CouponController.getCounpon))
coupons.post("/", expressAsyncHandler(isAdmin, CouponController.createCounpon))
coupons.put("/:id", expressAsyncHandler(isAdmin, CouponController.updateCounpon))
coupons.delete("/:id", expressAsyncHandler(isAdmin, CouponController.deleteCounpon))
export default coupons
