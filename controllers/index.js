const { register, login } = require("./user-controller");
const {
   getAllProducts,
   getAllCategories,
   getSingleProduct,
   getProductInCategory,
   getSearchItem,
} = require("./product-controller");
const {
   getAllProductInAUserCart,
   addProductToAUserCart,
   deleteProductFromAUserCart,
   deleteAllProductsFromAUserCart,
   incrementCartItem,
   decrementCartItem,
   checkout,
} = require("./cart-controller");
module.exports = {
   register,
   login,

   getAllProducts,
   getAllCategories,
   getSingleProduct,
   getProductInCategory,
   getSearchItem,
   getAllProductInAUserCart,
   addProductToAUserCart,
   deleteProductFromAUserCart,
   deleteAllProductsFromAUserCart,
   incrementCartItem,
   decrementCartItem,
   checkout,
};
