const Product = require("../models/product");
const Category = require("../models/category");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

// Get Product By ID
exports.getProductById = (req, res, next, id) => {
   Product.findById(id).exec((err, product) => {
      if (err) {
         return res.status(400).json({
            error: "Product not found",
         });
      }
      req.product = product;
      next();
   });
};

// Create Product
exports.createProduct = (req, res) => {
   let form = new formidable.IncomingForm();
   form.keepExtensions = true;

   form.parse(req, (err, fields, file) => {
      if (err) {
         return res.status(400).json({
            error: "Image file not supported",
         });
      }
      // Fields restrictions
      const { name, price, description, category, stock } = fields;
      if (!name || !price || !description || !category || !stock) {
         return res.status(400).json({
            error: "Please enter all fields!!",
         });
      }

      let product = new Product(fields);

      // File Handling
      if (file.product_image) {
         if (file.product_image.size > 2097152) {
            return res.status(400).json({
               error: "File Size is greater than 2 MB",
            });
         }
         product.product_image.data = fs.readFileSync(file.product_image.path);
         product.product_image.contentType = file.product_image.type;
      }

      //Saving to the dataBase
      product.save((err, product) => {
         if (err) {
            return res.status(400).json({
               error: "Unable to save product in DataBase",
            });
         }
         res.json(product);
      });
   });
};

// Get Product
exports.getProduct = (req, res) => {
   req.product.photo = undefined;
   return res.json(req.product);
};
// Middleware to handle image optimization
exports.product_image = (req, res, next) => {
   if (req.product.product_image.data) {
      res.set("Content-Type", req.product.product_image.contentType);
      return res.send(req.product.product_image.data);
   }
   next();
};

// Update Product
exports.updateProduct = (req, res) => {
   let form = new formidable.IncomingForm();
   form.keepExtensions = true;

   form.parse(req, (err, fields, file) => {
      if (err) {
         return res.status(400).json({
            error: "Image file not supported",
         });
      }
      //Updation Code
      let product = req.product;
      product = _.extend(product, fields);

      // File Handling
      if (file.product_image) {
         if (file.product_image.size > 2097152) {
            return res.status(400).json({
               error: "File Size is greater than 2 MB",
            });
         }
         product.product_image.data = fs.readFileSync(file.product_image.path);
         product.product_image.contentType = file.product_image.type;
      }

      //Saving to the dataBase
      product.save((err, product) => {
         if (err) {
            return res.status(400).json({
               error: "Unable to update product in DataBase",
            });
         }
         res.json(product);
      });
   });
};

// Delete Product
exports.deleteProduct = (req, res) => {
   let product = req.product;
   product.remove((err, deletedProduct) => {
      if (err) {
         return res.status(400).json({
            error: "Product deletion failed!!",
         });
      }
      res.json({
         message: `${deletedProduct} deleted successfully`,
      });
   });
};

//Listing of Product
exports.productListing = (req, res) => {
   let limit = req.query.limit ? parseInt(req.query.limit) : 24;
   let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
   Product.find()
      .select("-product_image")
      .populate("category")
      .sort([[sortBy, "asc"]])
      .limit(limit)
      .exec((err, products) => {
         if (err) {
            return res.status(400).json({
               error: "No Proucts Found",
            });
         }
         return res.status(200).json({ products });
      });
};

//<------ Get products by individual category -------->
exports.getProductsMac = (req, res) => {
   let limit = req.query.limit ? parseInt(req.query.limit) : 8;
   let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
   Product.find({ category: "605e0858bc9a75065f5f21e8" })
      .select("-product_image")
      .populate("category")
      .sort([[sortBy, "asc"]])
      .limit(limit)
      .exec((err, products) => {
         if (err) {
            return res.status(400).json({
               error: "No Proucts Found",
            });
         }
         return res.status(200).json({ products });
      });
};

exports.getProductsIphone = (req, res) => {
   let limit = req.query.limit ? parseInt(req.query.limit) : 8;
   let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
   Product.find({ category: "609273c326db5707c2064e14" })
      .select("-product_image")
      .populate("category")
      .sort([[sortBy, "asc"]])
      .limit(limit)
      .exec((err, products) => {
         if (err) {
            return res.status(400).json({
               error: "No Proucts Found",
            });
         }
         return res.status(200).json({ products });
      });
};

exports.getProductsIpad = (req, res) => {
   let limit = req.query.limit ? parseInt(req.query.limit) : 8;
   let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
   Product.find({ category: "609273c826db5707c2064e15" })
      .select("-product_image")
      .populate("category")
      .sort([[sortBy, "asc"]])
      .limit(limit)
      .exec((err, products) => {
         if (err) {
            return res.status(400).json({
               error: "No Proucts Found",
            });
         }
         return res.status(200).json({ products });
      });
};

exports.getProductsWatch = (req, res) => {
   let limit = req.query.limit ? parseInt(req.query.limit) : 8;
   let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
   Product.find({ category: "605e087fbc9a75065f5f21ea" })
      .select("-product_image")
      .populate("category")
      .sort([[sortBy, "asc"]])
      .limit(limit)
      .exec((err, products) => {
         if (err) {
            return res.status(400).json({
               error: "No Proucts Found",
            });
         }
         return res.status(200).json({ products });
      });
};

exports.getProductsAccessories = (req, res) => {
   let limit = req.query.limit ? parseInt(req.query.limit) : 8;
   let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
   Product.find({ category: "60996179f81d5007b82dcb6f" })
      .select("-product_image")
      .populate("category")
      .sort([[sortBy, "asc"]])
      .limit(limit)
      .exec((err, products) => {
         if (err) {
            return res.status(400).json({
               error: "No Proucts Found",
            });
         }
         return res.status(200).json({ products });
      });
};

// Get All Unique Categories
exports.getAllUniqueCategories = (req, res) => {
   Product.distinct("category", {}, (err, category) => {
      if (err) {
         return res.status(400).json({
            error: "No Category Found!!",
         });
      }
      res.json(category);
   });
};

// Updating Stock
exports.updateStock = (req, res, next) => {
   let myOperation = req.body.order.products.map((prod) => {
      return {
         updateOne: {
            filter: { _id: prod._id },
            update: { $inc: { stock: -prod.count, sold: +prod.count } },
         },
      };
   });
   Product.bulkWrite(myOperation, {}, (err, products) => {
      if (err) {
         return res.status(400).json({
            error: "Bulk Operation Failed",
         });
      }
      next();
   });
};
