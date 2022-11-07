const { default: mongoose } = require("mongoose");
const appConfig = require("./config");

const connect = () => {
  mongoose
    .connect(appConfig().MONGODB_URL)
    .then(() => {
      console.log("Connected to mongoose");
    })
    .catch((error) => {
      console.log(error);
    });
  mongoose.set("debug", true);
};

module.exports = connect;
