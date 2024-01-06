const router = require('express').Router()
const Weekdays = require("../models/Weekdays");


router.get('/get', async (req, res) => {
    const weekdays = await Weekdays.find()

    if(!weekdays){
        return res.status(400).send('Weekdays are not found')
    }

    res.status(200).send(weekdays)
})

module.exports = router