const {Schema, model} = require('mongoose')

const classSchema = new Schema({
    schoolId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    curator: {
        type: String,
        required: true
    }
})

module.exports = model('class', classSchema)