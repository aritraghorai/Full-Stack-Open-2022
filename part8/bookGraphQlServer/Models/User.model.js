const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    minlength: 3,
  },
  favouriteGenre: {
    type: String,
  },
});
module.exports = mongoose.model("user", userSchema);
