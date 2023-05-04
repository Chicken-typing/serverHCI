import Product from "../models/productModel";
import sumCalculate from "../utils/sumCalculate";
class ProductController {
  // [GET]/
  getAllProducts(req, res) {
    res.send(Product.find());
  }
  // [POST]/
    createProduct(req, res) { 
        const product = new Product({
            ...req.body
        });
      product.save();
      res.send(product)
    }
}

export default new ProductController;
