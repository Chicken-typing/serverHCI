import mongoose from "mongoose";
const couponSchema = new mongoose.Schema({
    code: { type: String, required: true },
    proportion: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    condition: { type: Number, required: true },
    description:{type:String, required: true}

})
const Counpon = mongoose.model('Coupon', couponSchema)
export default  Counpon;