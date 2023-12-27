const {Schema, model} = require('mongoose')

const schoolSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
})

module.exports = model('school', schoolSchema)