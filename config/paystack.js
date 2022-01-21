const payStack = (req) => {
   const mySecretKey = `Bearer ${process.env.PAYSTACK_SECRET}`;
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
      request(options, callback);
   };
};
