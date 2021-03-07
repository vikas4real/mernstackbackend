const { Order, Cart } = require("../models/order");

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

//Get All Orders
exports.getAllOrders = (req, res) => {
   Order.find()
      .populate("user", "_id name email")
      .exec((err, order) => {
         if (err) {
            return res.status(400).json({
               error: "No Orders found in DataBase!!",
            });
         }
         res.json(order);
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
