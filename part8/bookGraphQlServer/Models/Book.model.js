const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author",
  },
  genres: [{ type: String }],
});
// schema.pre(/^find/, function () {
//   this.populate({
//     path: "Author",
//     options: { populate: { strictPopulate: true } },
//   });
// });

module.exports = mongoose.model("book", schema);
