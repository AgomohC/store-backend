const Products = require("../models/Products");
const { StatusCodes } = require("http-status-codes");

const { BadRequestError, UnauthenticatedError } = require("../errors");

const getAllProducts = async (req, res) => {
   const products = await Products.find({});
   return res.status(StatusCodes.OK).json(products);
};

const getAllCategories = async (req, res) => {
   let categories = ["All"];
   const products = await Products.find({});
   products.map((product) => {
      const { category } = product;
      categories.push(category);
   });
   categories = [...new Set(categories)];
   return res.status(StatusCodes.OK).json(categories);
};

const getSingleProduct = async (req, res) => {
   res.status(StatusCodes.OK).json({ singleProduct: "Single Product" });
};

const getProductInCategory = async (req, res) => {
   res.status(StatusCodes.OK).json({ categories: "categories product" });
};

module.exports = {
   getAllProducts,
   getAllCategories,
   getSingleProduct,
   getProductInCategory,
};
