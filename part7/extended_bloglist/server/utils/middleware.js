const User = require('../models/User')
const logger = require('./logger')
const { JWT_SECRET } = require('../utils/config')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
    logger.error(error)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'invalid token'
        })
    } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
            error: 'token expired'
        })
    } else if (error.code === 11000) {
        return res.status(400).json({
            error: 'Username alredy exists'
        })
    }

    next(error)
}
const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
    }
    next()
}
const userExtractor = async (req, res, next) => {
    const token = req.token
    if (token) {
        const { id } = jwt.decode(token, JWT_SECRET)
        const user = await User.findById(id)
        req.user = user
    }
    next()
}
module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}
