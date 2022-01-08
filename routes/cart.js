const router = require("express").Router();

// import controllers

// define routes

//  get all products in a user's cart
router.route("/cart/:id").get();

//  add to cart
router.route("/cart/:id").post();

//  remove from cart
router.route("/cart/:id").delete();

// clear cart
router.route("/cart/:id").delete();

// increment cart item
router.route("/cart/:id").patch();

// decrement cart item
router.route("/cart/:id").patch();

// checkout
router.route("/cart/:id").post();

module.exports = router;
