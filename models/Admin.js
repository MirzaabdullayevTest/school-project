const {Schema, model} = require('mongoose')

const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isHeadAdmin:{
        type: Boolean,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
})

module.exports = model('admin', adminSchema)