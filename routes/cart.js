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
router.route("/:id").get(getAllProductInAUserCart);

//  add to cart
router.route("/:id").post(addProductToAUserCart);

//  remove from cart
router.route("/:id").delete(deleteProductFromAUserCart);

// clear cart
router.route("/:id").delete(deleteAllProductsFromAUserCart);

// increment cart item
router.route("/:id").patch(incrementCartItem);

// decrement cart item
router.route("/:id").patch(decrementCartItem);

// checkout
router.route("/:id").post(checkout);

module.exports = router;
