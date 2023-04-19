import users from ".";
import { isAdmin, isAuthenticated } from "../../validation";
import User from "../../models/userModel";
import expressAsyncHandler from "express-async-handler";
import generateToken from "../../utils/generateToken";

//Add new customer account
users.post(
  "/signup",
  expressAsyncHandler(async (req, res, next) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      avatar: req.body.avatar,
      birthday: req.body.birthday,
      address: req.body.address,
      phone: req.body.phone,
      role: "customer",
      isActive: true,
      password: bcrypt.hashSync(req.body.password),
    });
    await newUser.save();
    res.send({
      ...newUser,
      token: generateToken(newUser),
    });
  })
);

// Add new admin account
userRoute.post(
  "/",
  isAuthenticated,
  isMasterAdmin,
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      avatar: req.body.avatar,
      birthday: req.body.birthday,
      address: req.body.address,
      phone: req.body.phone,
      role: "admin",
      isActive: true,
      password: bcrypt.hashSync(req.body.password),
    });
    await newUser.save();
    res.send({
      ...newUser,
      token: generateToken(newUser),
    });
  })
);
