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
router.route("/:_id").get(getAllProductInAUserCart);

//  add to cart
router.route("/:_id").post(addProductToAUserCart);

//  remove from cart
router.route("/delete/:_id").delete(deleteProductFromAUserCart);

// clear cart
router.route("/delete_all/:_id").delete(deleteAllProductsFromAUserCart);

// increment cart item
router.route("/increment:_id").patch(incrementCartItem);

// decrement cart item
router.route("/decrement/:_id").patch(decrementCartItem);

// checkout
router.route("/checkout/:_id").post(checkout);

module.exports = router;
