const stripe = require("stripe")(process.env.SECRET_KEY);
const uuid = require("uuid");
const { Order } = require("../models/order");

exports.makepayment = (req, res) => {
   const { products, token, userId } = req.body;
   console.log(token);
   console.log(token.email);
   // <------ Calculate final amount---------->
   let amount = 0;
   products.map((p) => {
      amount = amount + p.price;
   });
   // <-------- Unique Payment for user ------->
   const idempotencyKey = uuid();
   return stripe.customers
      .create({
         email: token.email,
         source: token.id,
      })
      .then((customer) => {
         stripe.charges.create(
            {
               amount: amount * 100,
               currency: "inr",
               customer: customer.id,
               receipt_email: token.email,
               description: "A Test Account",
               shipping: {
                  name: token.card.name,
                  address: {
                     line1: token.card.address_line1,
                     line2: token.card.address_line2,
                     city: token.card.address_city,
                     country: token.card.address_country,
                  },
               },
            },
            { idempotencyKey }
         );
      })
      .then((result) => {
         const newOrder = new Order({
            products: products,
            txn_id: token.id,
            total_amount: amount,
            address: token.address_line1,
            user: userId,
         });
         newOrder.save();
         return res.status(200).json({ result, newOrder });
      })
      .catch((err) => console.log(err));
};
