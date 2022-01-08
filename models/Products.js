const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema({
   //  title: {
   //     type: String,
   //     unique: true,
   //  },
   //  commentCount: {
   //     type: Number,
   //     default: 0,
   //  },
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
