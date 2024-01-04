const express = require('express')
const router = express.Router()
const School = require('../models/School')
const validate = require('../middleware/validation')
const {schoolCreateSchema, schoolUpdateSchema, schoolDeleteSchema} = require("../middleware/validation-schemas/school");

router.post('/create', validate(schoolCreateSchema), async (req, res) => {
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

router.post('/update', validate(schoolUpdateSchema), async (req, res) => {
    const {name, userId, schoolId} = req.body

    if(!req.admin.isHeadAdmin){
        res.send('You are not head admin')
        return
    }

    const school = await School.findById(schoolId)

    if(!school){
        res.send('School is not found')
        return
    }

    if(name){
        school.name = name
    }

    if(userId){
        school.userId = userId
    }

    await School.findByIdAndUpdate(school._id, school)

    res.status(200).send('Successfully updated')
})

router.post('/delete', validate(schoolDeleteSchema), async (req, res) => {
    if(!req.admin.isHeadAdmin){
        res.send('You are not head admin')
        return
    }

    try{
        await School.findByIdAndDelete(req.body.schoolId)
        res.status(200).send('Successfully deleted')
    }catch (e){
        return res.status(400).send(e)
    }
})

router.get('/list', async (req, res) => {
    if(!req.admin.isHeadAdmin){
        res.send('You are not head admin')
        return
    }

    const schools = await School.find()

    if(!schools){
        res.send('Schools list is empty')
        return
    }

    res.status(200).send(schools)
})

router.get('/get/:schoolId', async (req, res) => {
    if(!req.admin.isHeadAdmin){
        res.send('You are not head admin')
        return
    }

    const school = await School.findById(req.params.schoolId)

    if(!school){
        res.send('School is not found')
        return
    }

    res.status(200).send(school)
})

module.exports = router