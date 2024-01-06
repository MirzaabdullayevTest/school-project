const {Schema, model} = require('mongoose')

const clientUserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    schoolId: {
        type: String,
        required: true
    }
})

module.exports = model('client-user', clientUserSchema)