const {
    createUser,
    getAllUsers,
    loginUser
} = require('../controllers/UserController')

const userRouter = require('express').Router()

userRouter.route('/').post(createUser).get(getAllUsers)
userRouter.post('/login', loginUser)

module.exports = userRouter
