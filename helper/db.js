const mongoose = require('mongoose')
let uri = process.env.MONGODB_URI

module.exports = async () => {
    try{
        await mongoose.connect(uri)

        console.log('MongoDB connected')
    }catch (e){
        console.log(e)
    }
}