const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
   name: {
      type: String,
      required: [true, "please enter name"],
   },
   email: {
      type: String,
      required: [true, "please enter email"],
      match: [
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         "Please provide a valid email",
      ],
      unique: true,
   },
   username: {
      type: String,
      required: [true, "please enter username"],
      unique: true,
   },
   cartItems: [
      {
         type: mongoose.Types.ObjectId,
         ref: "Cart",
      },
   ],
   password: {
      type: String,
      required: [true, "please enter password"],
   },
});

//hash password before saving to the dbs
UserSchema.pre("save", async function () {
   this.delete_password = await bcrypt.hash(this.delete_password, 12);
});

// create token
UserSchema.methods.createJWT = function () {
   return jwt.sign(
      { userId: this._id, name: this.name },
      process.env.JWT_SECRET,
      {
         expiresIn: process.env.JWT_LIFETIME,
      }
   );
};

// compare password with hash in db
ThreadSchema.methods.comparePasswords = async function (candidatePassword) {
   const isMatch = await bcrypt.compare(
      candidatePassword,
      this.delete_password
   );
   return isMatch;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
