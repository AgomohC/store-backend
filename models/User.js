const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
   //  title: {
   //     type: String,
   //     unique: true,
   //  },
   //  commentCount: {
   //     type: Number,
   //     default: 0,
   //  },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
