const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const userSchema = new mongoose.Schema(
   {
      fname: {
         type: String,
         required: true,
         maxlength: 32,
         trim: true,
      },
      lname: {
         type: String,
         maxlength: 32,
         trim: true,
      },
      email: {
         type: String,
         required: true,
         trim: true,
         unique: true,
      },
      encrypted_password: {
         type: String,
         required: true,
      },
      salt: String,

      role: {
         type: Number,
         default: 0,
      },

      purchases: {
         type: Array,
         default: [],
      },
   },
   { timestamps: true }
);

userSchema
   .virtual("password")
   .set(function (password) {
      this._password = this.password;
      this.salt = uuidv1();
      this.encrypted_password = this.securePassword(password);
   })
   .get(function () {
      return this._password;
   });

userSchema.methods = {
   authenticate: function (plain_password) {
      return this.securePassword(plain_password) === this.encrypted_password;
   },
   securePassword: function (plain_password) {
      if (!plain_password) return "";
      try {
         return crypto
            .createHmac("sha256", this.salt)
            .update(plain_password)
            .digest("hex");
      } catch (e) {
         return "";
      }
   },
};

module.exports = mongoose.model("User", userSchema);
