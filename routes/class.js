const express = require('express')
const router = express.Router()
const School = require('../models/School')
const Class = require('../models/Class')
const auth = require('../middleware/auth')

router.post('/create', auth, async (req, res) => {
    const {name, schoolId, curator} = req.body

    if(parseInt(name) < 1 || parseInt(name) > 11){
        res.status(404).send('Your class name is not correct. Please write class number interval from 1 to 11 and one letter')
        return
    }

    const school = await School.findById(schoolId)

    if(!req.admin.isHeadAdmin && school.userId !== req.admin._id){
        res.send('You are not head admin or school user')
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

module.exports = router