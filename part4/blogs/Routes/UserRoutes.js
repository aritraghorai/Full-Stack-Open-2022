const { createUser, getAllUsers } = require('../controllers/UserController')

const userRouter = require('express').Router()

userRouter.route('/').post(createUser).get(getAllUsers)

module.exports = userRouter
