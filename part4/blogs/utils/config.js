require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI =
    process.env.NODE_ENV === 'test'
        ? process.env.MONGODB_URL_TEST
        : process.env.MONGO_URI
const JWT_SECRET = process.env.JWT_SECRET
module.exports = {
    MONGODB_URI,
    PORT,
    JWT_SECRET
}
