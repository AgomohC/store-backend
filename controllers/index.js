const { register, login } = require("./user-controller");
const {
   getAllProducts,
   getAllCategories,
   getSingleProduct,
   getProductInCategory,
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
   getAllProductInAUserCart,
   addProductToAUserCart,
   deleteProductFromAUserCart,
   deleteAllProductsFromAUserCart,
   incrementCartItem,
   decrementCartItem,
   checkout,
};
