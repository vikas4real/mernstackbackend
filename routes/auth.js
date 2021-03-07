var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const {
   signup,
   signin,
   signout,
   isSignedIn,
   isAuthenticated,
} = require("../controllers/auth");

//SignUP Authentication
router.post(
   "/signup",
   [
      check("fname")
         .isLength({ min: 2, max: 20 })
         .withMessage("First Name must be between 3 and 20 letters"),
      check("email").isEmail().withMessage("E-mail Required"),
      check("password")
         .isLength({ min: 8, max: 20 })
         .withMessage("Password must be between 8 to 20 characters"),
   ],
   signup
);

//SignIn Authentication
router.post(
   "/signin",
   [
      check("email").isEmail().withMessage("E-mail Required"),
      check("password")
         .isLength({ min: 8, max: 20 })
         .withMessage("Password Required"),
   ],
   signin
);

//SignOut
router.get("/signout", signout);

//isSignedIn Route
router.get("/testroute", isSignedIn, (req, res) => {
   res.send("A protected route");
});

//isAuthenticated Route
router.get("/isAuthenticated", isAuthenticated);
module.exports = router;
