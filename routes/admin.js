const express = require('express')
const Admin = require('../models/Admin')
const router = express.Router()

router.post('/create', async (req, res,next)=>{
    const {name, email, password, isHeadAdmin} = req.body

    const candidate = await Admin.findOne({ email })

    let admin = null

    if(candidate){
        res.send('This email is busy')
        return
    }

    if(isHeadAdmin){
        const checkHeadAdmin = await Admin.findOne({ isHeadAdmin: true })

        if(checkHeadAdmin){
            res.send('Head admin was already created')
            return
        }

        admin = new Admin({
            name, password, email, isHeadAdmin
        })
    }else{
        admin = new Admin({
            name, password, email, isHeadAdmin
        })
    }

    await admin.save()
    res.send('Admin created')
})

module.exports = router