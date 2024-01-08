const express = require('express')
const router = express.Router()
const School = require('../models/School')
const Class = require('../models/Class')
const validate = require('../middleware/validation')
const {classCreateSchema, classUpdateSchema, classDeleteSchema} = require("../middleware/validation-schemas/class");


router.post('/create', validate(classCreateSchema), async (req, res) => {
    const {name, schoolId, curator} = req.body
    const school = await School.findById(schoolId)

    if(!school){
        return res.status(400).send('School is not found')
    }

    if(!req.admin.isHeadAdmin && school.userId !== req.admin._id){
        res.send('You are not head admin or school user')
        return
    }

    if(parseInt(name) < 1 || parseInt(name) > 11){
        res.status(404).send('Your class name is not correct. Please write class number interval from 1 to 11 and one letter')
        return
    }

    const clas = new Class({
        name,
        schoolId,
        curator
    })

    await clas.save()

    res.status(201).send('Successfully created')
})

router.get('/list/:schoolId', async (req, res) => {
    const classes = await Class.find({ schoolId: req.params.schoolId })

    if(!classes){
        return res.send('Classes not found')
    }

    res.status(200).send(classes)
})

router.post('/update', validate(classUpdateSchema), async (req, res) => {
    const clas = await Class.findById(req.body.classId);

    if(!clas){
        return res.send('Clas not found')
    }

    if(req.body.name){
        clas.name = req.body.name
    }

    if(req.body.curator){
        clas.curator = req.body.curator
    }

    await Class.findByIdAndUpdate(req.body.classId, clas)
    res.status(201).send('Successfully updated')
})

router.post('/delete', validate(classDeleteSchema), async (req, res) => {
    try{
        await Class.findByIdAndDelete(req.body.classId);
        return res.status(201).send('Successfully deleted')
    }catch (e) {
        return res.status(400).send(e)
    }
})

router.get('/get/:classId', async (req, res) => {
    const clas = await Class.findById(req.params.classId)

    if(!clas){
        return res.send('Clas is not found')
    }

    res.status(200).send(clas)
})

module.exports = router