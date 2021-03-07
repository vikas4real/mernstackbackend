const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema({
   product: {
      type: ObjectId,
      ref: "Product",
   },
   name: String,
   count: Number,
   price: Number,
});
const Cart = mongoose.model("Cart", cartSchema);

const orderSchema = new mongoose.Schema(
   {
      products: [cartSchema],
      txn_id: {},
      total_amount: { type: Number },
      address: { type: String },
      status: {
         type: String,
         default: "Placed",
         enum: ["Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
      },
      updated: Date,
      user: {
         type: ObjectId,
         ref: "User",
      },
   },
   { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, Cart };
