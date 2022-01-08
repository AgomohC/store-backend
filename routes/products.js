const router = require("express").Router();

// import controllers

// define routes

//  get all products
router.route("/products").get();

//  get all categories
router.route("/products/categories").get();

//  get all single product
router.route("/products/:id").get();

//  get products in categories
router.route("/products/categories/:category").get();

module.exports = router;
