const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

//SignUP Controller
exports.signup = (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({
         error: errors.array()[0].msg,
      });
   }
   const user = new User(req.body);
   user.save((err, user) => {
      if (err) {
         return res.status(400).json({
            err: "NOT able to save USER data in DB",
         });
      }
      res.json(user);
   });
};

//SignIn Controller
exports.signin = (req, res) => {
   const errors = validationResult(req);
   const { email, password } = req.body;
   if (!errors.isEmpty()) {
      return res.status(422).json({
         error: errors.array()[0].msg,
      });
   }
   User.findOne({ email }, (err, user) => {
      if (err || !user) {
         return res.status(400).json({
            error: "User E-mail doesn't exist",
         });
      }
      if (!user.authenticate(password)) {
         return res.status(401).json({
            error: "User E-mail or password does not match",
         });
      }
      //Create TOKEN
      const token = jwt.sign(
         { _id: user._id, email: user.email },
         process.env.SECRET
      );
      //Put TOKEN in COOKIE
      res.cookie("token", token, { expire: new Date() + 9999 });
      //Send Response to FrontEND
      const { _id, fname, lname, email, role } = user;
      return res.json({ token, user: { _id, fname, lname, email, role } });
   });
};

//SignOut Controller
exports.signout = (req, res) => {
   res.clearCookie("token");
   res.json({
      message: "You have been Successfully signed out",
   });
};

//Protected Routes

//isSignedIn Controller
exports.isSignedIn = expressJwt({
   secret: process.env.SECRET,
   userProperty: "auth",
});

//isAuthenticated Controller
exports.isAuthenticated = (req, res, next) => {
   let checker = req.profile && req.auth && req.profile._id == req.auth._id;
   if (!checker) {
      return res.status(403).json({
         error: "ACCESS DENIED",
      });
   }
   next();
};

//isAdmin Controller
exports.isAdmin = (req, res, next) => {
   if (req.profile.role === 0) {
      return res.status(403).json({
         error: "You are not ADMIN, ACCESS DENIED!",
      });
   }
   next();
};
