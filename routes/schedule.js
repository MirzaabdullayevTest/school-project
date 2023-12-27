const express = require('express')
const router = express.Router()
const Schedule = require('../models/Schedule')
const School = require('../models/School')
const auth = require('../middleware/auth')

router.post('/create', auth, async (req, res) => {
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

module.exports = router