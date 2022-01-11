const Products = require("../models/Products");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getAllProducts = async (req, res) => {
   const products = await Products.find({});

   console.log(req.url);
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
   const {
      params: { _id },
   } = req;
   const product = await Products.findOne({ _id });

   if (!product) {
      throw new NotFoundError("Item not found");
   }
   return res.status(StatusCodes.OK).json(product);
};

const getProductInCategory = async (req, res) => {
   const {
      params: { category },
   } = req;
   const product = await Products.find({ category });

   return res.status(StatusCodes.OK).json(product);
};

const getSearchItem = async (req, res) => {
   let {
      body: { searchValue },
   } = req;
   searchValue = new RegExp(searchValue);
   const product = await Products.find({
      title: { $regex: searchValue, $options: "ig" },
   });
   // const product = await Products.find({}).$where(function () {
   //    return (this.category = searchValue);
   // });
   // console.log(product);
   if (!product) {
      throw new NotFoundError("Item not found");
   }
   return res.status(StatusCodes.OK).json(product);
};

module.exports = {
   getAllProducts,
   getAllCategories,
   getSingleProduct,
   getProductInCategory,
   getSearchItem,
};
