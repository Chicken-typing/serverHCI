import mongoose from "mongoose";

const deliveryInfoSchema = new mongoose.Schema({
  receiverName: { type: String},
  address: { type: String },
  city: { type: String },
  country: { type: String},
  postalCode: { type: String},
  receiverPhone: { type: String},
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
    defaultDelivery:{type: Number, required:true, default:0 },
    deliveryInfo: [deliveryInfoSchema]
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
