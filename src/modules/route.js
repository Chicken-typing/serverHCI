import express from "express";
const users = require('./user')
const products = require('./product')
const route = (app) => {
    const router = express.Router()
    app.use('/apiv2',router)
    router.use('/users', users)
    router.use('/products',products)
}
export default route