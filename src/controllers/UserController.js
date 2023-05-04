import User from "../models/userModel";
import generateToken from "../utils/generateToken";
class UserController {
  //[POST]/create-new-account
  //[POST]/add-new-account
  add(req, res) {
    new User({
      username: req.body.username,
      email: req.body.email,
      birthday: req.body.birthday,
      address: req.body.address,
      phone: req.body.phone,
      role: req.body.role, //TODO new change "get role from browser"
      isActive: true,
      deliveryInfo: [{
        receiverName:req.body.username,
      }],
      password: bcrypt.hashSync(req.body.password), //todo change encrypt menthod
    }).save();
    res.send({ message: "Create Account Successfully!" });
  }

  //[GET]/
  async getAll(req, res) {
    res.send(await User.find());
  }
  //[DELETE]/:id
  async delete(req, res) {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.role === "masteradmin") {
        res.status(400).send({ message: "Can Not Delete Admin User" });
        return;
      }
      user.remove();
      res.status(200).send({ message: "User Deleted" });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  }
  //[PUT]/:id/profile
  async modify(req, res) {
    const user = await User.findById(req.user._id);
    if (user) {
      if (user?.role !== "masteradmin") {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.address = req.body.address || user.address;
        user.avatar = req.body.avatar || user.avatar;
        user.birthday = req.body.birthday || user.birthday;
        user.phone = req.body.phone || user.phone;
        const updatedUser = await user.save();
        res.send({
          _id: updatedUser._id,
          name: updatedUser.username,
          email: updatedUser.email,
          password: updatedUser.password,
          birthday: updatedUser.birthday,
          address: updatedUser.address,
          phone: updatedUser.phone,
        });
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
        user.isActive = req.body.isActive;
        const updatedUser = await user.save();
        res.send({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          avatar: updatedUser.avatar,
          birthday: updatedUser.birthday,
          address: updatedUser.address,
          phone: updatedUser.phone,
          isActive: updatedUser.isActive,
          token: generateToken(updatedUser),
        });
      }
    } else {
      res.status(404).send({ message: "User not found" });
    }
  }
}
export default new UserController();
