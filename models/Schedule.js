const {Schema, model} = require('mongoose')

const scheduleSchema = new Schema({
    schoolId:{
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    breakTime: {
        type: String,
        required: true
    },
    bigBreakTime: {
        type: String,
        required: true
    },
    bigBreakAfterLesson:{
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
})

module.exports = model('schedule', scheduleSchema)