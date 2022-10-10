const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { JWT_SECRET } = require('../utils/config')

const createPasswrdHash = async (password) => {
    const slatRounds = 10
    const hashPassword = await bcrypt.hash(password, slatRounds)
    return hashPassword
}
const createToken = (tokenBody) =>
    jwt.sign(tokenBody, JWT_SECRET, { expiresIn: '2d' })

/**
 * @route : POST /api/users/
 * @desc : Create new user
 * @access : Public
 */
const createUser = async (req, res) => {
    const { name, username, password } = req.body
    if (!name || !password || !username) {
        return res.status(400).json({ error: 'Invalid username or password' })
    }
    if (password.length < 3 || username.length < 3) {
        return res.status(400).json({
            error: 'Username and Email should be at least 3 characters'
        })
    }

    const passwordHash = await createPasswrdHash(req.body.password)
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        passwordHash
    })
    const newUser = await user.save()
    const token = createToken({ id: newUser._id, username: newUser.username })
    res.status(201).json({
        name: newUser.name,
        username: newUser.username,
        token
    })
}
/**
 * @route : GET /api/users/
 * @desc : Get all user
 * @access : Public
 */
const getAllUsers = async (req, res) => {
    const users = await User.find({}).populate('blogs')
    res.status(200).json(users)
}
/**
 * @route : GET /api/users/
 * @desc : Get all user
 * @access : Public
 */
const loginUser = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(401).json({ err: 'Invalid Username and password' })
    }

    const user = await User.find({ username }).select('+passwordHash')

    if (!user || !(await bcrypt.compare(password, user[0].passwordHash))) {
        return res.status(401).json({ err: 'Invalid Username and password' })
    }

    const token = createToken({ id: user[0]._id, username: user[0].username })
    res.status(200).json({
        name: user[0].name,
        username: user[0].username,
        token,
        id: user[0].id
    })
}
module.exports = {
    createUser,
    getAllUsers,
    loginUser
}
