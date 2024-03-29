const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");
const {
   getOrderById,
   createOrder,
   getAllOrders,
   getAllUserOrders,
   getOrderStatus,
   updateOrderStatus,
} = require("../controllers/order");
const { isInteger } = require("lodash");

// parameters
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//actual routes
router.post(
   "/order/create/:userId",
   isSignedIn,
   isAuthenticated,
   pushOrderInPurchaseList,
   updateStock,
   createOrder
);

router.get(
   "/:userId/order/all",
   isSignedIn,
   isAuthenticated,
   isAdmin,
   getAllOrders
);

router.get("/:userId/orders", isSignedIn, isAuthenticated, getAllUserOrders);

router.get(
   "/order/status/:userId",
   isSignedIn,
   isAuthenticated,
   isAdmin,
   getOrderStatus
);
router.put(
   "/order/:orderId/status/:userId",
   isSignedIn,
   isAuthenticated,
   isAdmin,
   updateOrderStatus
);
module.exports = router;
