const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
   const newUser = await User.create({ ...req.body });
   const token = newUser.createJWT();
   const user = await User.findOne({ _id: newUser._id }).select(
      "firstName lastName cartItems email username"
   );
   return res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req, res) => {
   const { username, password } = req.body;
   if (!username || !password) {
      throw new BadRequestError("Please provide username and password");
   }
   const user = await User.findOne({ username });
   if (!user) {
      throw new UnauthenticatedError("Invalid Credentials");
   }
   // compare password
   const isPasswordCorrect = await user.comparePasswords(password);
   if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
   }
   const token = user.createJWT();
   const newUser = await User.findOne({ username }).select(
      "_id firstName lastName username email cartItems"
   );

   return res.status(StatusCodes.OK).json({ user: newUser, token });
};

module.exports = {
   register,
   login,
};
