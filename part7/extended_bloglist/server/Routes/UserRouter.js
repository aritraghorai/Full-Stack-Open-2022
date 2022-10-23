const {
    createUser,
    getAllUsers,
    loginUser,
    getUserByUserId
} = require('../controllers/UserController')

const userRouter = require('express').Router()

userRouter.route('/').post(createUser).get(getAllUsers)
userRouter.post('/login', loginUser)
userRouter.route('/:id').get(getUserByUserId)

module.exports = userRouter
