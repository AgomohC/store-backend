const Cart = require("../models/Cart");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");

const getAllProductInAUserCart = async (req, res) => {
   const {
      params: { _id },
   } = req;
   const user = User.findById({ _id }).populate({
      path: "cartItems",
   });

   return res.status(StatusCodes.OK).json({ cart: "cart products" });
};
const addProductToAUserCart = async (req, res) => {
   const {
      params: { _id },
      body,
   } = req;
   const userCart = await Cart.findOneAndUpdate(
      { user_id: _id },
      { $push: { products_id: body } },
      {
         new: true,
         runValidators: true,
      }
   ).populate({
      path: "products_id",
      select: "_id title price description image category",
   });
   if (!userCart) {
      const newCart = await Cart.create({
         user_id: _id,
         products_id: [body],
      });
      const returnedCart = await Cart.findOne({ _id: newCart._id }).populate({
         path: "products_id",
         select: "_id title price description image category",
      });
      return res.status(StatusCodes.CREATED).json(returnedCart);
   }

   return res.status(StatusCodes.CREATED).json(userCart);
};
const deleteProductFromAUserCart = async (req, res) => {
   res.status(StatusCodes.OK).json({ cart: "deleted cart products" });
};
const deleteAllProductsFromAUserCart = async (req, res) => {
   res.status(StatusCodes.OK).json({ cart: "deleted all cart products" });
};
const incrementCartItem = async (req, res) => {
   res.status(StatusCodes.OK).json({ cart: "decremented cart item" });
};
const decrementCartItem = async (req, res) => {
   res.status(StatusCodes.OK).json({ cart: "decremented cart item" });
};
const checkout = async (req, res) => {
   res.status(StatusCodes.OK).json({ cart: "checkout" });
};

module.exports = {
   getAllProductInAUserCart,
   addProductToAUserCart,
   deleteProductFromAUserCart,
   deleteAllProductsFromAUserCart,
   incrementCartItem,
   decrementCartItem,
   checkout,
};
