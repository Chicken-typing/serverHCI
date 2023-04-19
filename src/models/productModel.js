import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String},
    comment: { type: String },
    rating: { type: Number },
  },
  {
    timestamps: true,
  }
);
const sizeChartSchema = new mongoose.Schema({
  size: { type: Number, required: true }, 
  available:{type: Number, required: true}
})

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    images: { type: Array, required: true },
    defaultImages: { type: String, required: true },
    brand: { type: String, required: true },
    sizeChart: [sizeChartSchema],
    category: { type: Array, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    promotion: { type: Number },
    countInStock:{type: Number, required:true},
    reviews: [reviewSchema],
    numReviews: { type: Number },
    totalRate:{type:Number}
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;