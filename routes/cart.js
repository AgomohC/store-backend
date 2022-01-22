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
   checkOutCallBack,
} = require("../controllers");
// define routes

//  get all products in a user's cart
router.route("/").get(getAllProductInAUserCart);

//  add to cart
router.route("/").post(addProductToAUserCart);

//  remove from cart
router.route("/delete/:product_id").delete(deleteProductFromAUserCart);

// clear cart
router.route("/delete_all").delete(deleteAllProductsFromAUserCart);

// increment cart item
router.route("/increment").patch(incrementCartItem);

// decrement cart item
router.route("/decrement").patch(decrementCartItem);

// checkout
router.route("/checkout").post(checkout);

// checkout callback
router.route("/paystack/checkout").get(checkOutCallBack);

module.exports = router;
