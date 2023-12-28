const express = require('express')
const router = express.Router()
const Table = require('../models/Table')
const auth = require('../middleware/auth')

router.post('/create', auth, async (req, res) => {
    const {classId, lessonNumber, subject, teacher, room} = req.body

    const table = new Table({
        classId, lessonNumber, subject, teacher, room
    })

    await table.save()

    res.status(201).send('Successfully created')
})

module.exports = router