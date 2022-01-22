const Cart = require("../models/Cart");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const mongoose = require("mongoose");
const axios = require("axios");
const res = require("express/lib/response");
const mySecretKey = `Bearer ${process.env.PAYSTACK_SECRET}`;

// const { initializePayment, verifyPayment } =
// require("../config/paystack")(axios);

const getAllProductInAUserCart = async (req, res) => {
   const {
      user: { user_id },
   } = req;

   let cart = await Cart.findOne({ user_id }).populate({
      path: "products.product_id",
      select: "_id title price description image category",
   });
   if (!cart) {
      cart = await Cart.create({ user_id });
      return res.status(StatusCodes.OK).json(cart);
   }

   return res.status(StatusCodes.OK).json(cart);
};
const addProductToAUserCart = async (req, res) => {
   const {
      user: { user_id },
      body: { product_id },
   } = req;

   // check if product_id exists
   if (!product_id) {
      throw new BadRequestError(`please enter id`);
   }

   //  find the cart that belongs to the user
   const userCart = await Cart.findOne({ user_id });

   // check if the cart does not exist
   if (!userCart) {
      // if the cart does not exist create a new cart
      const newCart = await Cart.create({
         user_id,
         products: [
            { product_id: mongoose.Types.ObjectId(product_id), quantity: 1 },
         ],
         count: 1,
      });

      // find the newly created cart, populate the relevant fields
      const returnedCart = await Cart.findOne({ _id: newCart._id }).populate({
         path: "products.product_id",
         select: "_id title price description image category",
      });

      // return
      return res.status(StatusCodes.CREATED).json(returnedCart);
   }

   // check if the product passed in exists in the cart
   const isProductInCart = userCart.products.find(
      (product) => product.product_id.toString() === product_id
   );

   //  logic to execute if the product does not exist
   if (!isProductInCart) {
      const updatedCount = userCart.count + 1;
      const update = await Cart.findOneAndUpdate(
         { user_id },
         {
            $push: { products: { product_id, quantity: 1 } },
            count: updatedCount,
         },
         {
            new: true,
            runValidators: true,
         }
      ).populate({
         path: "products.product_id",
         select: "_id title price description image category",
      });

      return res.status(StatusCodes.CREATED).json(update);
   }

   // logic to execute if the product exists in the cart
   let returnedProducts = userCart.products.filter(
      (product) => product.product_id.toString() !== product_id
   );

   const incrementedProduct = {
      product_id: mongoose.Types.ObjectId(isProductInCart.product_id),
      quantity: isProductInCart.quantity + 1,
   };
   returnedProducts.push(incrementedProduct);
   const userCart2 = await Cart.findOneAndUpdate(
      { user_id },
      { products: returnedProducts, count: userCart.count + 1 },
      {
         new: true,
         runValidators: true,
      }
   ).populate({
      path: "products.product_id",
      select: "_id title price description image category",
   });

   return res.status(StatusCodes.CREATED).json(userCart2);
};
const deleteProductFromAUserCart = async (req, res) => {
   const {
      params: { product_id },
      user: { user_id },
   } = req;

   // check if product_id was passed in
   if (!product_id) {
      throw new BadRequestError("Please enter product");
   }

   //  find the user's cart
   const filterItem = await Cart.findOne({ user_id });

   // throw error if user doesn't have a cart
   if (!filterItem) {
      throw new NotFoundError("No cart found");
   }
   const deletedItem1 = filterItem.products.find(
      (product) => product.product_id.toString() === product_id
   );
   if (!deletedItem1) {
      throw new NotFoundError("Item not in cart");
   }
   const filterArray = filterItem.products.filter(
      (product) => product.product_id.toString() !== product_id
   );
   const newCount = filterItem.count - deletedItem1.quantity;
   const deletedItem = await Cart.findOneAndUpdate(
      { user_id },
      { products: [...filterArray], count: newCount },
      { new: true, runValidators: true }
   ).populate({
      path: "products.product_id",
      select: "_id title price description image category",
   });
   if (!deletedItem) {
      throw new NotFoundError("No cart found");
   }

   return res.status(StatusCodes.OK).json(deletedItem);
};
const deleteAllProductsFromAUserCart = async (req, res) => {
   const {
      user: { user_id },
   } = req;
   const emptyCart = await Cart.findOneAndUpdate(
      { user_id },
      { products: [], count: 0 },
      { new: true, runValidators: true }
   );
   if (!emptyCart) {
      throw new NotFoundError(`Cart does not exist`);
   }
   return res.status(StatusCodes.OK).json(emptyCart);
};
const incrementCartItem = async (req, res) => {
   const {
      body: { product_id },
      user: { user_id },
   } = req;

   // check if product id exists in the request body
   if (!product_id) {
      throw new BadRequestError("Please enter product");
   }

   //  find cart
   const filterCart = await Cart.findOne({ user_id });
   if (!filterCart) {
      throw NotFoundError("No cart found");
   }
   const updatedItem = filterCart.products.find(
      (product) => product.product_id.toString() === product_id
   );
   if (!updatedItem) {
      throw new NotFoundError("Item not in cart");
   }
   const filterArray = filterCart.products.filter(
      (product) => product.product_id.toString() !== product_id
   );
   const update = {
      product_id: mongoose.Types.ObjectId(product_id),
      quantity: updatedItem.quantity + 1,
      created_at: updatedItem.created_at,
   };
   const userCart = await Cart.findOneAndUpdate(
      { user_id },
      { products: [...filterArray, update], count: filterCart.count + 1 },
      { new: true, runValidators: true }
   ).populate({
      path: "products.product_id",
      select: "_id title price description image category",
   });
   if (!userCart) {
      throw new NotFoundError("Cart does not exist");
   }

   return res.status(StatusCodes.OK).json(userCart);
};
const decrementCartItem = async (req, res) => {
   const {
      body: { product_id },
      user: { user_id },
   } = req;

   // check if the product_id is missing
   if (!product_id) {
      throw new BadRequestError("Please enter product");
   }

   // check if the user has a cart
   const filterCart = await Cart.findOne({ user_id });

   // throw  error if user has no cart
   if (!filterCart) {
      throw new NotFoundError("No cart found");
   }

   //  find the item to be decremented
   const updatedItem = filterCart.products.find(
      (product) => product.product_id.toString() === product_id
   );

   // throw error is the item is not in the cart
   if (!updatedItem) {
      throw new NotFoundError("Item not in cart");
   }

   // remove the item to be decremented from the cart
   const filterArray = filterCart.products.filter(
      (product) => product.product_id.toString() !== product_id
   );

   // if the item to be decremented has a quantity of one, return the cart like that while decrementing the cart
   if (updatedItem.quantity === 1) {
      // find the cart and update it without the item with a quantity of 0
      const userCart = await Cart.findOneAndUpdate(
         { user_id },
         { products: [...filterArray], count: filterCart.count - 1 },
         { new: true, runValidators: true }
      ).populate({
         path: "products.product_id",
         select: "_id title price description image category",
      });

      //  check if inserting into the database was successful
      if (!userCart) {
         throw new NotFoundError("Cart does not exist");
      }

      // json return
      return res.status(StatusCodes.OK).json(userCart);
   }
   let update = {
      product_id: mongoose.Types.ObjectId(product_id),
      quantity: updatedItem.quantity - 1,
      created_at: updatedItem.created_at,
   };

   let userCart = await Cart.findOneAndUpdate(
      { user_id },
      { products: [...filterArray, update], count: filterCart.count - 1 },
      { new: true, runValidators: true }
   ).populate({
      path: "products.product_id",
      select: "_id title price description image category",
   });
   if (!userCart) {
      throw new NotFoundError("Cart does not exist");
   }

   return res.status(StatusCodes.OK).json(userCart);
};
const checkout = async (req, res) => {
   let {
      amount,
      email,
      fullName: full_name,
      phoneNumber: phone_number,
   } = req.body;
   const metadata = {
      full_name,
   };
   amount *= 100;
   const url = "https://api.paystack.co/transaction/initialize";
   const headers = {
      authorization: mySecretKey,
      "content-type": "application/json",
      "cache-control": "no-cache",
   };
   const {
      data: {
         data: { authorization_url },
      },
   } = await axios.post(
      url,
      {
         amount,
         email,
         full_name,
         phone_number,
         metadata,
      },
      { headers }
   );

   res.status(StatusCodes.OK).redirect(authorization_url);
};

const checkOutCallBack = async (req, res) => {
   console.log(req.url);
   const { reference } = req.query;
   const url =
      "https://api.paystack.co/transaction/verify/" +
      encodeURIComponent(reference);
   const headers = {
      authorization: mySecretKey,
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
   };
   const { data } = await axios.get(url, { headers });
   console.log(data);
   return res.status(StatusCodes.OK).json({ msg: "done" });
};
module.exports = {
   getAllProductInAUserCart,
   addProductToAUserCart,
   deleteProductFromAUserCart,
   deleteAllProductsFromAUserCart,
   incrementCartItem,
   decrementCartItem,
   checkout,
   checkOutCallBack,
};
