import mongoose from "mongoose";
const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  size: { type: Number, required: true },
  image: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  lastestPrice: { type: Number, required: true },
});
const orderSchema = new mongoose.Schema(
  {
    orderItem: [orderItemSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    shipInfo: { type: Object, required: true },
    itemsPrice: { type: Number, required: true },
    discountItemsPrice: { type: Number, required: true },
    shipCost: { type: Number, required: true },
    tax: { type: Number, required: true },
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      type: Object,
      required: true,
    },
    isPaid: { type: Boolean, required: true },
    deliveryBy: {
      agent: {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        fullName: { type: String, required: true },
        phoneNumber: { type: String, required: true },
      },
      deliveredAt: { type: Date, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default  Order;
