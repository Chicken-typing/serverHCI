import moment from "moment";
import User from "../models/userModel.js";
import checkAvailable from "../utils/checkAvailable.js";
import generateToken from "../utils/generateToken.js";
import Product from "../models/productModel.js";
class UserController {
  //[POST]/create-new-account
  //[POST]/add-new-account
  async add(req, res) {
    await new User({
      username: req.body.username,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      role: req.body.role, //TODO new change "get role from browser"
      deliveryInfo: [
        {
          receiverName: req.body.username,
        },
      ],
      password: bcrypt.hashSync(req.body.password, 10), //todo change encrypt menthod
    }).save();
    res.send({ message: "Create Account Successfully!" });
  }
  //[POST]/:id/password
  //compare password
  async checkPassword(req, res) {
    const user = await User.findById(req.params.id);
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) return true;
      return false;
    }
  }
  //[GET]/
  async getAll(req, res) {
    res.send(await User.find());
  }
  //[GET]/login
  async login(req, res) {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (checkAvailable) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = generateToken(user);
          res.send({ token });
        } else {
          res.send({ message: "Wrong Password" });
        }
      } else {
        res.send({
          message: `Go back after ${moment(user.active.updateTime)
            .add(1, "d")
            .toString()}`,
        });
      }
    }
  }
  //[DELETE]/:id
  async delete(req, res) {
    const user = await User.findById(req.params.id);
    const products = await Product.find();
    if (user) {
      if (user.role === "masteradmin") {
        res.status(400).send({ message: "Can Not Delete Admin User" });
        return;
      }
      products.forEach(async (product) => {
        const updatedReview = await product.reviews.pull({ user: req.params.id });
        updatedReview.save()
      });
      await user.remove();
      res.status(200).send({ message: "User Deleted" });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  }
  //[PUT]/:id/password
  // TODO NEW API CHANGE PASSWORD
  async changePassword(req, res) {
    const user = await User.findById(req.params.id);
    user.password = bcrypt.hashSync(req.body.password, 10);
    user.save();
    res.send(generateToken(user));
  }
  //[PUT]/:id/profile
  async modify(req, res) {
    const user = await User.findById(req.user._id);
    if (user) {
      if (user.role !== "masteradmin") {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.address = req.body.address || user.address;
        user.avatar = req.body.avatar || user.avatar;
        user.birthday = req.body.birthday || user.birthday;
        user.phone = req.body.phone || user.phone;
        await user.save();
        res.send({
          _id: user._id,
          name: user.username,
          email: user.email,
          birthday: user.birthday,
          address: user.address,
          phone: user.phone,
        });
      } else {
        res.status(404).send({ message: "User is Master admin" });
      }
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  }
  //[PUT]/:id
  async access(req, res) {
    const user = await User.findById(req.body._id);
    if (user) {
      if (user.role !== "masteradmin") {
        user.active = req.body.active.isAvailable || user.active.isAvailable;
        await user.save();
        res.send({
          isActive: user.active.isAvailable,
          message: `Go back after: ${moment(user.active.updateTime)
            .add(1, "d")
            .toString()}`,
        });
      }
    } else {
      res.status(404).send({ message: "User not found" });
    }
  }
}
export default new UserController();
