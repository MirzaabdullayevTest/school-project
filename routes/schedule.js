const express = require('express')
const router = express.Router()
const Schedule = require('../models/Schedule')
const School = require('../models/School')
const generateTable = require('../helper/generateTable')
const validate = require('../middleware/validation')
const {scheduleCreateSchema} = require("../middleware/validation-schemas/schedule");

router.post('/create', validate(scheduleCreateSchema), async (req, res) => {
    const {schoolId, startTime, duration, breakTime, bigBreakTime, bigBreakAfterLesson, endTime} = req.body
    const school = await School.findById(schoolId)

    if(!req.admin.isHeadAdmin && school.userId !== req.admin._id){
        res.send('You are not head admin or school user')
        return
    }

    const isExist = await Schedule.findOne({schoolId: school._id})

    if(isExist){
        res.send('In this school already has schedule times')
        return
    }

    const schedule = new Schedule({
        schoolId,
        startTime,
        duration,
        breakTime,
        bigBreakTime,
        bigBreakAfterLesson,
        endTime,
    })

    await schedule.save()

    res.status(201).send('Successfully created')
})

router.get('/get/:schoolId', async (req, res) => {
    const schedule = await Schedule.findOne({schoolId: req.params.schoolId})

    if(!schedule){
        res.send('Schedule not found in this school')
        return
    }

    const table = generateTable(schedule)

    res.send(table)
})

module.exports = router