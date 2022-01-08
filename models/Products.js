const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema({
   title: {
      type: String,
   },
   price: {
      type: Number,
   },
   description: {
      type: String,
   },
   category: {
      type: String,
   },
   image: {
      type: String,
   },
   //  commentCount: {
   //     type: Number,
   //     default: 0,
   //  },
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
