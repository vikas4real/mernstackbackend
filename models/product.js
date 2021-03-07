const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         trim: true,
         required: true,
         maxlength: 32,
      },
      price: {
         type: Number,
         trim: true,
         required: true,
         maxlength: 6,
      },
      description: {
         type: String,
         trim: true,
         maxlength: 2000,
      },
      category: {
         type: ObjectId,
         ref: "Category",
         required: true,
      },
      stock: {
         type: Number,
      },
      sold: {
         type: Number,
         default: 0,
      },
      product_image: {
         data: Buffer,
         contentType: String,
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
