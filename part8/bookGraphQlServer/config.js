require("dotenv").config();

const appCongit = () => ({
  MONGODB_URL: process.env.MONGODB_URL,
});

module.exports = appCongit;
