const { default: mongoose } = require('mongoose')

// console.log(process.argv);
if (process.argv.length < 3) {
    console.log('Invalid Request please provide pasword')
    process.exit()
}

mongoose.connect(
    `mongodb+srv://aritraghorai:${process.argv[2]}@phonbook.vvu1yto.mongodb.net/test`
)

const personSchema = mongoose.Schema({
    name: String,
    number: String
})
const person = mongoose.model('Person', personSchema)

//*show all the contact
if (process.argv.length === 3) {
    console.log('phonebook')
    person
        .find({})
        .then((res) => {
            res.forEach((c) => {
                console.log(c.name, c.number)
            })
            mongoose.connection.close()
        })
        .catch((err) => {
            console.log(err)
        })
}
//*Add new Contact
if (process.argv.length > 3) {
    person
        .create({
            name: process.argv[3],
            number: process.argv[4]
        })
        .then((newPerson) => {
            newPerson.save()
        })
        .then(() => {
            console.log(
                `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
            )
            mongoose.connection.close()
        })
        .catch((err) => {
            console.log(err)
        })
}
