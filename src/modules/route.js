import express from "express";
import users from "./user/index.js"
import products from './product/index.js'
import coupons from "./coupon/index.js";
const route = (app) => {
    const router = express.Router()
    app.use('/', (req, res) => {
        res.status(201).send({ message: "Welcome to DKL store" });
    })
    app.use('/apiv2',router)
    router.use('/users', users)
    router.use('/products', products)
    router.use('/coupon',coupons)
}
export default route