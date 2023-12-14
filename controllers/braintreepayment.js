const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
   environment: braintree.Environment.Sandbox,
   merchantId: "mzcfj3v6g6dw6pgn",
   publicKey: "9fb6bgmvgw5vss44",
   privateKey: "ed57e511df1d2ee63d87d0b1b9b448f8",
});

exports.getToken = (req, res) => {
   gateway.clientToken.generate({}, (err, response) => {
      if (err) {
         res.status(500).send(err);
      } else {
         res.send(response);
      }
   });
};
exports.processPayment = (req, res) => {
   let nonceFromTheClient = req.body.paymentMethodNonce;

   let amountFromTheClient = req.body.amount;
   gateway.transaction.sale(
      {
         amount: amountFromTheClient,
         paymentMethodNonce: nonceFromTheClient,
         options: {
            submitForSettlement: true,
         },
      },
      (err, result) => {
         if (err) {
            res.status(500).json(err);
         } else {
            res.json(result);
         }
      }
   );
};
