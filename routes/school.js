const express = require('express')
const router = express.Router()
const School = require('../models/School')

router.post('/create', async (req, res) => {
    const {name, userId} = req.body

    if(!req.admin.isHeadAdmin){
        res.send('You are not head admin')
        return
    }

    const school = new School({
        name,
        userId
    })

    await school.save()

    res.status(201).send('Successfully created')
})

module.exports = router