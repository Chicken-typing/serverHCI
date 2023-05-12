import moment from "moment";
import Counpon from "../models/couponModel";

const applyCoupon = async(code) => {
    const coupon = await Coupon.findOne({ code: code });
    const day = moment().format()
    if (coupon) {
        if (moment(day).isSameOrBefore(coupon.endDate) && moment(day).isSameOrAfter(coupon.startDate)) {
            
        }
    }
}
export default applyCoupon