const router = require("express").Router();

// import controllers
const {
   getAllProducts,
   getAllCategories,
   getSingleProduct,
   getProductInCategory,
   getSearchItem,
} = require("../controllers");

// define routes

//  get all products
router.route("/").get(getAllProducts);

//  get all categories
router.route("/categories").get(getAllCategories);

//  get all single product
router.route("/single/:_id").get(getSingleProduct);

//  get products in categories
router.route("/categories/:category").get(getProductInCategory);

// get item searched for
router.route("/search/:searchValue").get(getSearchItem);

module.exports = router;
