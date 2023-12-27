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

router.get('/get/:id', auth, async (req, res) => {
    const schedule = await Schedule.findOne({schoolId: req.params.id})

    if(!schedule){
        res.send('Schedule not found in this school')
        return
    }

    const table = generateTable(schedule)

    res.send(table)
})

function generateTable(schedule){
    const table = []

    const schoolOverTimeInMinutes = convertToMinutes(schedule.endTime)
    let startTimeInMinutes = convertToMinutes(schedule.startTime)
    let number = 1

    while(schoolOverTimeInMinutes > startTimeInMinutes){
        let startTime = convertToHHMM(startTimeInMinutes)
        let endTimeInMinutes = startTimeInMinutes + parseInt(schedule.duration)
        let endTime = convertToHHMM(endTimeInMinutes)
        let breakTime = parseInt(schedule.breakTime)

        if(number === parseInt(schedule.bigBreakAfterLesson)){
            breakTime = parseInt(schedule.bigBreakTime)
        }

        let lesson = {
            number,
            startTime,
            endTime,
            breakTime
        }

        table.push(lesson)

        startTimeInMinutes = endTimeInMinutes + breakTime
        number++
        breakTime = parseInt(schedule.breakTime)
    }

    return table
}

function convertToMinutes(time){
    const [hours, minutes] = time.split(':');
    return parseInt(hours) * 60 + parseInt(minutes);
}

function convertToHHMM(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
}

module.exports = router