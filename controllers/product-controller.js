const Products = require("../models/Products");
const { StatusCodes } = require("http-status-codes");

const { BadRequestError, UnauthenticatedError } = require("../errors");

const getAllProducts = async (req, res) => {
   res.status(StatusCodes.OK).json({ products: "products" });
};

const getAllCategories = async (req, res) => {
   res.status(StatusCodes.OK).json({ categories: "categories" });
};

const getSingleProduct = async (req, res) => {
   res.status(StatusCodes.OK).json({ singleProduct: "Single Product" });
};

const getProductInCategory = async (req, res) => {
   res.status(StatusCodes.OK).json({ categories: "categories" });
};

module.exports = {
   getAllProducts,
   getAllCategories,
   getSingleProduct,
   getProductInCategory,
};
