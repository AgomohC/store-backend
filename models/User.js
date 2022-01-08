const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = mongoose.Schema({
   name: {
      type: String,
      required: [true, "please enter name"],
   },
   email: {
      type: String,
      required: [true, "please enter email"],
   },
   username: {
      type: String,
      required: [true, "please enter username"],
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
