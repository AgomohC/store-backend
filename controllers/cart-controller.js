const Cart = require("../models/Cart");
const { StatusCodes } = require("http-status-codes");
const {
   BadRequestError,
   UnauthenticatedError,
   NotFoundError,
} = require("../errors");

const getAllProductInAUserCart = async (req, res) => {
   const {
      params: { user_id },
   } = req;
   if (!user_id) {
      throw new BadRequestError(`Please enter id`);
   }
   const cart = await Cart.findOne({ user_id }).populate({
      path: "products_id",
      select: "_id title price description image category",
   });
   if (!cart) {
      throw new NotFoundError(`Cart not found`);
   }
   return res.status(StatusCodes.OK).json(cart);
};
const addProductToAUserCart = async (req, res) => {
   const {
      params: { user_id },
      body: { product_id },
   } = req;
   if (!user_id || !product_id) {
      throw new BadRequestError(`please enter id`);
   }
   const userCart = await Cart.findOne({ user_id });
   if (!userCart) {
      const newCart = await Cart.create({
         user_id,
         products_id: [product_id],
         count: 1,
      });
      const returnedCart = await Cart.findOne({ _id: newCart._id }).populate({
         path: "products_id",
         select: "_id title price description image category",
      });
      return res.status(StatusCodes.CREATED).json(returnedCart);
   }
   const userCart2 = await Cart.findOneAndUpdate(
      { user_id },
      { $push: { products_id: product_id }, count: userCart.count + 1 },
      {
         new: true,
         runValidators: true,
      }
   ).populate({
      path: "products_id",
      select: "_id title price description image category",
   });
   return res.status(StatusCodes.CREATED).json(userCart2);
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
