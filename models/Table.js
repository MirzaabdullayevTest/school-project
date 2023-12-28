const {Schema, model} = require('mongoose')

const tableSchema = new Schema({
    classId: {
        type: String,
        required: true
    },
    lessonNumber: {
        type: Number,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    dayId: {
        type: String,
        required: true
    }
})

module.exports = model('table', tableSchema)