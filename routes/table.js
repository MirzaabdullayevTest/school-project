const express = require('express')
const router = express.Router()
const Table = require('../models/Table')
const Class = require('../models/Class')
const Schedule = require('../models/Schedule')
const generateTable = require('../helper/generateTable')
const validate = require('../middleware/validation')
const {tableCreateSchema} = require("../middleware/validation-schemas/table");

router.post('/create', validate(tableCreateSchema), async (req, res) => {
    const {classId, lessonNumber, subject, teacher, room, dayId} = req.body
    const clas = await Class.findById(classId)

    if(!clas){
        return res.status(404).send('Class is not exist')
    }

    const table = new Table({
        classId, lessonNumber, subject, teacher, room, dayId
    })

    await table.save()

    res.status(201).send('Successfully created')
})

router.get('/get/:dayId/:classId', async (req, res) => {
    const table = await Table.find({classId: req.params.classId, dayId: req.params.dayId}).sort({'lessonNumber': 1})

    if(!table){
        res.send('Table not found in this class')
        return
    }

    const clas = await Class.findById(req.params.classId)
    const schedule = await Schedule.findOne({schoolId: clas.schoolId})

    const scheduleTimes = generateTable(schedule)

    const fullTable = getFullTable(table, scheduleTimes)

    res.status(200).send(fullTable)
})

function getFullTable(table, times){
    let tableLength = table.length
    let fullTable = []
    let i = 1

    while(tableLength >= i){
        let lesson = table[i - 1]
        let time = times[i - 1]

        fullTable.push({
            classId: lesson.classId,
            dayId: lesson.dayId,
            lessonNumber: lesson.lessonNumber,
            subject: lesson.subject,
            teacher: lesson.teacher,
            room: lesson.room,
            startTime: time.startTime,
            endTime: time.endTime
        })
        i++
    }

    return fullTable
}

module.exports = router