const router = require("express").Router();

// import controllers
const {
   getAllProducts,
   getAllCategories,
   getSingleProduct,
   getProductInCategory,
} = require("../controllers");

// define routes

//  get all products
router.route("/products").get(getAllProducts);

//  get all categories
router.route("/products/categories").get(getAllCategories);

//  get all single product
router.route("/products/:id").get(getSingleProduct);

//  get products in categories
router.route("/products/categories/:category").get(getProductInCategory);

module.exports = router;
