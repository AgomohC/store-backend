const payStack = (req) => {
   const mySecretKey = `Bearer ${process.env.PAYSTACK_SECRET}`;
   // TODO: REFACTOR WITH ASYNC/AWAIT SYNTAX AND REMOVE THIS CONFIG WRAPPER
   // TODO: MAKE A POST REQUEST WITH AXIOS TO PAYSTACK API WITH THIS URL, GET THE DATA AND AUTHORIZATION URL FROM THE DATA AND REDIRECT TO THE AUTHORIZATION URL
   // TODO: FOR THE CALL BACK, DESTRUCTURE REFERENCE FROM THE REQUEST QUERY AND MAKE A GET REQUEST TO THE URL BELOW WITH THE REF ENCODED WITHIN
   // TODO: ERRORS ARE HANDLED BY THE EXPRESS ASYNC ERRORS AMD THE ERROR HANDLER MIDDLEWARE SO NO NEED TO BOTHER ABOUT THEM BUT TRY TO LEARN MORE ABOUT RELEVANT PAYSTACK ERRORS AND WRITE HANDLERS FOR THEM
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
