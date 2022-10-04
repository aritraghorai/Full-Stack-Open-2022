require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

const { default: Person } = require('./models/person')
const unknownEndpoint = require('./Middleware/ErrorHandlers/unknownEndpoint')
const mainErrorHandler = require('./Middleware/ErrorHandlers/mainErrorHandler')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.get('/', (req, res) => {
    // eslint-disable-next-line no-undef
    res.send(path.join(__dirname, 'build', 'index.html'))
})

morgan.token('body', (req) => {
    if (req.method === 'POST') return JSON.stringify(req.body)
    else ''
})
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :body'
    )
)

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then((persons) => {
            res.json(persons)
        })
        .catch(() => {
            res.status(400).json({ message: 'something went wrong' })
        })
})
app.get('/info', (req, res) => {
    const length = Person.find({}).then((res) => res.length)
    res.send(`<div>
   <div>Phonbook has info for ${length} People</div>
  <div>${new Date()}</div>
</div>`)
})
app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findById(id)
        .then((person) => {
            res.status(200).json(person)
        })
        .catch(next)
})
app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndDelete({ _id: id })
        .then(() => {
            res.status(204).json({})
        })
        .catch(next)
})
app.post('/api/persons', (req, res, next) => {
    if (!req.body.name || !req.body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    }
    Person.create({ name: req.body.name, number: req.body.number })
        .then((newPerson) => {
            res.status(201).json(newPerson)
        })
        .catch(next)
})
app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndUpdate(id, req.body, { new: true })
        .then((person) => {
            res.status(200).json(person)
        })
        .catch(next)
})

app.use(unknownEndpoint)

app.use(mainErrorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server is Running ${PORT}`)
