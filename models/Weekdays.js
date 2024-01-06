const {Schema, model} = require('mongoose')

const weekdaysSchema = new Schema({
    day: {
        type: String,
    }
})

module.exports = model('weekday', weekdaysSchema)