import Coupon from "../models/couponModel";
class CounpoController {
  // [GET]/
  async getAllCoupon(req, res) {
    const coupons = await Coupon.find();
    res.send(coupons);
  }
  // [GET]/:code
  async getCoupon(req, res) {
    const coupon = await Coupon.findOne({ code: req.params.code });
    res.send(coupon);
  }
  // [POST]/
  async createCoupon(req, res) {
    const coupon = new Coupon(req.body);
    const couponCreated = await coupon.save();
    res.send(couponCreated);
  }
  // [PUT]/:id
  async updateCoupon(req, res) {
    const coupon = await Coupon.findOne({ _id: req.params.id });
    coupon.code = req.body.code;
    coupon.proportion = req.body.proportion;
    coupon.description = req.body.description;
    coupon.startDate = req.body.startDate;
    coupon.endDate = req.body.endDate;
    const couponUpdated = await coupon.save();
    res.send(couponUpdated);
  }
  // [DELETE]/:id
  async deleteCoupon(req, res) {
    const coupon = await Coupon.findOne({ _id: req.params.id });
    await coupon.remove();
    res.send("Coupon Deleted");
  }
}
export default new CounpoController();
