const payStack = (req) => {
   const mySecretKey = `Bearer ${process.env.PAYSTACK_SECRET}`;

   // tOdO: ON THE FRONT END, WHEN THE CHECKOUT CALLBACK IS SUCCESSFUL, SHOW A SNACKBAR WITH ORDER PLACED, ISSUE A RECEIPT AND CLEAR CART. RECEIPT WOULD BE SIMILAR TO ORDER SUMMARY COMPONENT
   const initializePayment = (form, cb) => {
      const options = {
         url: "https://api.paystack.co/transaction/initialize",
         headers: {
            authorization: mySecretKey,
            "content-type": "application/json",
            "cache-control": "no-cache",
         },
         form,
      };
      const callback = (error, response, body) => {
         return cb(error, body);
      };
      req.post(options, callback);
   };
   const verifyPayment = (ref, cb) => {
      const options = {
         url:
            "https://api.paystack.co/transaction/verify/" +
            encodeURIComponent(ref),
         headers: {
            authorization: mySecretKey,
            "content-type": "application/json",
            "cache-control": "no-cache",
         },
      };
      const callback = (error, response, body) => {
         return cb(error, body);
      };
      req.get(options, callback);
   };
   return { initializePayment, verifyPayment };
};

module.exports = payStack;
