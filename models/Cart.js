const mongoose = require("mongoose");
const CartSchema = mongoose.Schema({
   user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "no user id provided"],
   },
   products_id: [
      {
         type: mongoose.Types.ObjectId,
         ref: "Product",
      },
   ],
   count: {
      type: Number,
   },
});
const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
