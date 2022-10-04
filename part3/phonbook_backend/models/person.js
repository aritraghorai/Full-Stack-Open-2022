const mongoose = require('mongoose')

const url = process.env.MONGO_URL
mongoose
    .connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        validate: [
            {
                validator: function (num) {
                    console.log(num)
                    if (num.length < 8) {
                        return false
                    }
                    const sp = num.split('-')
                    if (sp.length <= 1 || sp.length > 2) {
                        return false
                    }
                    if (sp[0].length <= 1) {
                        return false
                    }
                    if (!/[0-9]/.test(sp[0]) || !/[0-9]/.test(sp[0])) {
                        return false
                    }
                    return true
                },
                msg: 'invalid phone number number should be like eg. 09-1234556 and 040-22334455'
            }
        ]
    }
})
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const person = mongoose.model('Person', personSchema)

module.exports = {
    default: person
}
