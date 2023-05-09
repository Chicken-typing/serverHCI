import Product from "../models/productModel.js";
import sumCalculate from "../utils/sumCalculate.js";
class ProductController {
  // [GET]/
  async getAllProducts(req, res) {
    res.send(await Product.find());
  }
  // [GET]/admin
  async getListProduct(req, res) {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || 3;

    const products = await Product.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await Product.countDocuments();
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  }
  // [GET]/categories
  async getListProductByCategory(req, res) {
    res.send(await Product.find().distinct("category"));
  }
  // [GET]/slug/:slug
  async getProductBySlug(req, res) {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  }
  // [GET]/:id
  async getProductById(req, res) {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  }
  // [POST]/
  //todo not be refactored
  async createProduct(req, res) {
    const product = new Product({
      ...req.body,
      defaultImage: req.body.images[0],
      
    });
    await product.save();
    res.send(product);
  }
  // [POST]/:id/reviews
  async createReview(req, res) {
    const product = Product.findById(req.params.id);
    if (product) {
      if (product.reviews.find((x) => x.email === req.user.email)) {
        return res
          .status(400)
          .send({ message: "You already submitted a review" });
      }
      product.reviews.push({
        user: req.user._id,
        name: req.user.username,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      });
      product.numReviews = product.reviews.length;
      product.avgRate =
        product.reviews.reduce((a, c) => c.rating + a, 0) / product.numReviews;
      await product.save();
      res.status(201).send({
        review: product.reviews[product.reviews.length - 1],
        numReviews: product.numReviews,
        rating: product.rating,
      });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  }
  // [PUT]/:id
  //todo not be refactored
  async updateProduct(req, res) {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.price = req.body.price || product.price;
      product.description = req.body.description || product.description;
      product.sizeChart = req.body.sizeChart || product.sizeChart;
      await product.save();
      res.send({ message: "Product Updated" },product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  }
  //TODO NEW API
  //[PUT]/:id/promotion
  async updatePromotion(req, res) { 
    const product = await Product.findById(req.params.id)
    if (product) { 
      product.promotion = req.body.promotion
      await product.save();
      res.send(product.promotion)
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  }
  // [DELETE]/:id
  async deleteProduct(req, res) {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.send({ message: "Product Deleted" });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  }
  //[DELELTE]/:prodId/reviews/:id"
  async deleteReview(req, res) {
    const product = await Product.findById(req.params.prodId);
    await Product.findOneAndUpdate(
      { _id: req.params.prodId },
      { $pull: { reviews: { _id: req.params.id } } }
    );
    if (product.reviews.length > 0) {
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) / product.numReviews;
    } else {
      product.rating = 0;
    }
    await product.save();
    res.status(200).send({ message: "Review deleted" });
  }
}

export default new ProductController();
