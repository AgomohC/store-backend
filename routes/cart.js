const router = require("express").Router();

// import controllers
const {
   getAllProductInAUserCart,
   addProductToAUserCart,
   deleteProductFromAUserCart,
   deleteAllProductsFromAUserCart,
   incrementCartItem,
   decrementCartItem,
   checkout,
} = require("../controllers");
// define routes

//  get all products in a user's cart
router.route("/cart/:id").get(getAllProductInAUserCart);

//  add to cart
router.route("/cart/:id").post(addProductToAUserCart);

//  remove from cart
router.route("/cart/:id").delete(deleteProductFromAUserCart);

// clear cart
router.route("/cart/:id").delete(deleteAllProductsFromAUserCart);

// increment cart item
router.route("/cart/:id").patch(incrementCartItem);

// decrement cart item
router.route("/cart/:id").patch(decrementCartItem);

// checkout
router.route("/cart/:id").post(checkout);

module.exports = router;
