const express = require('express')
const Admin = require('../models/Admin')
const auth = require('../middleware/auth')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const saltRounds = 10;
const secret_key = process.env.JWT_SECRET_KEY
const expireMinute = 60

router.post('/create', async (req, res,next)=>{
    const {name, email, password, isHeadAdmin} = req.body

    const candidate = await Admin.findOne()

    if(candidate){
        res.send('Head admin is already exist')
        return
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const admin = new Admin({
        name, password: hashedPassword, email, isHeadAdmin
    })

    await admin.save()
    res.send('Admin created')
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })

    if(!admin){
        res.send('Incorrect email.')
        return
    }

    const areSame = await bcrypt.compare(password, admin.password)

    if(!areSame){
        res.send('Incorrect password.')
        return
    }

    const token = jwt.sign({email: admin.email, isHeadAdmin: admin.isHeadAdmin, _id: admin._id}, secret_key, {expiresIn: 60 * expireMinute})

    res.header('x-auth-token', token).send('The head admin has been successfully signed.')
})

router.post('/update', auth, async (req, res) => {
    const {password, name, email, oldPassword} = req.body

    if(!email){
        res.send('Email is required')
        return
    }

    const admin = await Admin.findOne({ email })

    if(!admin){
        res.send('Admin not exist with this email')
        return
    }

    if(password && oldPassword){
        const areSame = await bcrypt.compare(oldPassword, admin.password)

        if(!areSame){
            res.send('Incorrect password.')
            return
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds)

        admin.password = hashedPassword
    }

    if(name){
        admin.name = name
    }

    await Admin.findByIdAndUpdate(admin.id, admin)
    res.send('Successfully updated.')
})

module.exports = router