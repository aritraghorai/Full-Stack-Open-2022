const { default: mongoose } = require('mongoose')
const { MONGODB_URI } = require('./config')

const connectDb = () => {
    mongoose.connect(MONGODB_URI)
}
module.exports = connectDb
