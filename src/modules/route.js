import express from "express";
const route = express.Router()
route.get('/', (req, res) => {
    res.send(" The api of Life Sport website.");
})
route.use("/users");
export default route;