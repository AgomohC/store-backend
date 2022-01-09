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
router.route("/").get(getAllProducts);

//  get all categories
router.route("/categories").get(getAllCategories);

//  get all single product
router.route("/:id").get(getSingleProduct);

//  get products in categories
router.route("/categories/:category").get(getProductInCategory);

module.exports = router;
