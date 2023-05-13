import moment from "moment";
import Order from "../models/orderModel";
import User from "../models/userModel";
import Coupon from "../models/couponModel";
import countDownProduct from "../utils/countDownProduct";
class OrderController {
  // [GET]/
  async getAll(req, res) {
    try {
      const orders = await Order.find().populate("user", "username");
      return res.status(200).send(orders);
    } catch (error) {
      return res.status(500).send({
        error: error.message,
      });
    }
  }
  // [GET]/:id
  async getOne(req, res) {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).send({
          message: "Order not found",
        });
      }
      return res.status(200).send(order);
    } catch (error) {
      return res.status(500).send({
        error: error.message,
      });
    }
  }
  // [GET]/mine
  async getMine(req, res) {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  }
  // [POST]/
  async create(req, res) {
    try {
      const coupon = 0;
      const itemList = req.body.orderItems.map((x) => ({
        ...x,
        product: x._id,
      }));
      const itemsPrice = itemList.map((x) => ++x.lastestPrice);
      const newOrder = new Order({
        orderItems: itemList,
        user: req.user._id,
        shipInfo: req.body.shippingAddress,
        itemsPrice: itemsPrice, //Total price of all items in list
        discountItemsPrice: itemsPrice * (1 - coupon), //Total price of all items after selling off
        shipCost: req.body.shipCost,
        tax: req.body.tax,
        // coupon: coupon._id,
        totalPrice: req.body.totalPrice,
        paymentMethod: req.body.paymentMethod,
        paymentResult: { ...req.body.paymentResult },
        isPaid: req.body.paymentResult.status === "COMPLETED" ? true : false,
      });
      countDownProduct(order.orderItems);
      const order = await newOrder.save();
      return res.status(201).send(order);
    } catch (error) {
      return res.status(500).send({
        error: error.message,
      });
    }
  }
  // [PUT]/:id/delivery
  async delivery(req, res) {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).send({
          message: "Order not found",
        });
      }
      const agent = await User.findById(req.body.agentId);
      const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
        $set: {
          deliveryBy: {
            agent: {
              _id: agent._id,
              fullName: agent.username,
              phoneNumber: agent.phone,
            },
            deliveriedAt: moment().format(),
          },
        },
      });
      updatedOrder.save();
      return res.status(200).send(updatedOrder);
    } catch (error) {
      return res.status(500).send({
        error: error.message,
      });
    }
  }
  // [PUT]/:id/payment
  async payment(req, res) {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).send({
          message: "Order not found",
        });
      }
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      res.send({ message: "Order Paid", order: updatedOrder });
    } catch (error) {
      return res.status(500).send({
        error: error.message,
      });
    }
    return res.status(200).send(order);
  }
  // [PUT]/:id/cancel
  async cancel(req, res) { 
    
  }
  // [DELETE]/:id
  async delete(req, res) {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).send({
          message: "Order not found",
        });
      }
      await order.remove();
      return res.status(200).send({
        message: "Order deleted",
      });
    } catch (error) {
      return res.status(500).send({
        error: error.message,
      });
    }
  }
}
export default new OrderController;
