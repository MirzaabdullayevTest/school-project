const express = require('express')
const router = express.Router()
const Table = require('../models/Table')
const auth = require('../middleware/auth')

router.post('/create', auth, async (req, res) => {
    const {classId, lessonNumber, subject, teacher, room, dayId} = req.body

    const table = new Table({
        classId, lessonNumber, subject, teacher, room, dayId
    })

    await table.save()

    res.status(201).send('Successfully created')
})

router.get('/get/:dayId/:classId', auth, async (req, res) => {
    const table = await Table.find({classId: req.params.classId, dayId: req.params.dayId}).sort({'lessonNumber': 1})

    if(!table){
        res.send('Table not found in this class')
        return
    }

    res.status(200).send(table)
})



module.exports = router