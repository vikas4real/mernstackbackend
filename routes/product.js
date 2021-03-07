const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
   getProductById,
   createProduct,
   getProduct,
   product_image,
   updateProduct,
   deleteProduct,
   productListing,
   getAllUniqueCategories,
} = require("../controllers/product");

//Parameter Routes
router.param("userId", getUserById);
router.param("productId", getProductById);

//Actual Routes
router.post(
   "/product/create/:userId",
   isSignedIn,
   isAuthenticated,
   isAdmin,
   createProduct
);
router.get("/product", getProductById);
router.get("/product/:productId", getProduct);
router.get("/product/image/:productId", product_image);
router.get("/product", productListing);
router.put(
   "/product/:productId/:userId",
   isSignedIn,
   isAuthenticated,
   isAdmin,
   updateProduct
);
router.delete(
   "/product/:productId/:userId",
   isSignedIn,
   isAuthenticated,
   isAdmin,
   deleteProduct
);
router.get("/product/categories", getAllUniqueCategories);

module.exports = router;
