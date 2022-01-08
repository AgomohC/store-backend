const mongoose = require("mongoose");
const CartSchema = mongoose.Schema({
   //  title: {
   //     type: String,
   //     unique: true,
   //  },
   //  commentCount: {
   //     type: Number,
   //     default: 0,
   //  },
});
const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
