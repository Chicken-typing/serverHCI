import Product from "../models/productModel.js";

const countDownProduct = (list) => {
  list.map(async (item) => {
    const product = await Product.find(item.product);
    product.countInStock -= item.quantity;
    await product.save();
  });
};
export default countDownProduct