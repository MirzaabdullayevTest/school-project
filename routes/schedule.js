const express = require('express')
const router = express.Router()
const Schedule = require('../models/Schedule')
const School = require('../models/School')
const generateTable = require('../helper/generateTable')
const validate = require('../middleware/validation')
const {scheduleCreateSchema, scheduleUpdateSchema, scheduleDeleteSchema} = require("../middleware/validation-schemas/schedule");

router.post('/create', validate(scheduleCreateSchema), async (req, res) => {
    const {schoolId, startTime, duration, breakTime, bigBreakTime, bigBreakAfterLesson, endTime} = req.body
    const school = await School.findById(schoolId)

    if(!school){
        return res.status(400).send('School is not found')
    }

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

router.post('/update', validate(scheduleUpdateSchema), async (req, res) => {
    const {schoolId, startTime, duration, breakTime, bigBreakTime, bigBreakAfterLesson, endTime} = req.body
    const school = await School.findById(schoolId)

    if(!school){
        return res.status(400).send('School is not found')
    }

    if(!req.admin.isHeadAdmin && school.userId !== req.admin._id){
        res.send('You are not head admin or school user')
        return
    }

    const schedule = await Schedule.findOne({schoolId: school._id})

    if(!schedule){
        res.send('In this school does not have schedule times')
        return
    }

    if(startTime){
        schedule.startTime = startTime
    }

    if(duration){
        schedule.duration = duration
    }

    if(breakTime){
        schedule.breakTime = breakTime
    }

    if(bigBreakTime){
        schedule.bigBreakTime = bigBreakTime
    }

    if(bigBreakAfterLesson){
        schedule.bigBreakAfterLesson = bigBreakAfterLesson
    }

    if(endTime){
        schedule.endTime = endTime
    }

    await Schedule.findByIdAndUpdate(schedule._id, schedule)

    res.status(201).send('Successfully updated')
})

router.post('/delete', validate(scheduleDeleteSchema), async (req, res) => {
    try{
        await Schedule.findByIdAndDelete(req.body.scheduleId);
        return res.status(201).send('Successfully deleted')
    }catch (e) {
        return res.status(400).send(e)
    }
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