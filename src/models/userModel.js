import mongoose from "mongoose";

const deliveryInfoSchema = new mongoose.Schema({
  receiverName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  receiverPhone: { type: String, required: true },
});
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    phone: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    role: { type: String, required: true },
    avatar: { type: String },
    deliveryInfo: [deliveryInfoSchema],
    defaultDelivery:{type: Number, required:true }
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
