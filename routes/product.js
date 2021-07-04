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
   getProductsMac,
   getProductsIphone,
   getProductsIpad,
   getProductsWatch,
   getProductsAccessories,
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
router.get("/products", productListing);
router.get("/mac", getProductsMac);
router.get("/iphone", getProductsIphone);
router.get("/ipad", getProductsIpad);
router.get("/watch", getProductsWatch);
router.get("/accessories", getProductsAccessories);
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
