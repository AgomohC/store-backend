const mongoose = require("mongoose");
const CartSchema = mongoose.Schema({
   user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "no user id provided"],
   },
   products: [
      {
         product_id: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
         },
         quantity: {
            type: Number,
            default: 1,
         },
         created_at: {
            type: Date,
            default: Date.now,
         },
      },
   ],
   count: {
      type: Number,
      default: 0,
   },
});
const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
