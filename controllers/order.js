const { Order, Cart } = require("../models/order");
const user = require("../models/user");

//Create Order
exports.createOrder = (req, res) => {
   req.body.order.user = req.profile;
   const order = new Order(req.body.order);
   order.save((err, order) => {
      if (err) {
         return res.status(400).json({
            error: "Failed to save order in DataBase!!",
         });
      }
      res.json(order);
   });
};

//GetOrderByID controller
exports.getOrderById = (req, res, next, id) => {
   Order.findById(id)
      .populate("products.product", "name price")
      .exec((err, order) => {
         if (err) {
            return res.status(400).json({
               error: "No Orders Found!!",
            });
         }
         req.order = order;
         next();
      });
};

//Get All Orders --- Actually used by admin
exports.getAllOrders = (req, res) => {
   let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
   Order.find()
      .populate("user", "_id fname lname email")
      .sort([[sortBy, "desc"]])
      .exec((err, orders) => {
         if (err) {
            return res.status(400).json({
               error: "No Orders found in DataBase!!",
            });
         }

         res.json(orders);
      });
};

//Get All User Orders ---- For individual users
exports.getAllUserOrders = (req, res) => {
   let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
   Order.find({ user: req.profile._id })
      .populate("user", "_id email")
      .sort([[sortBy, "desc"]])
      .exec((err, orders) => {
         if (err) {
            return res.status(400).json({
               error: "No Orders found in DataBase!!",
            });
         }

         res.json(orders);
      });
};

//Get Order Status
exports.getOrderStatus = (req, res) => {
   res.json(Order.schema.path("status").enumValues);
};

//Update Order Status
exports.updateOrderStatus = (req, res) => {
   Order.update(
      { _id: req.body.orderId },
      { $set: { status: req.body.status } },
      (err, order) => {
         if (err) {
            return res.status(400).json({
               error: "Cannot update order status!!",
            });
         }
         res.json(order);
      }
   );
};
