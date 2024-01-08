const express = require('express')
const Admin = require('../models/Admin')
const auth = require('../middleware/auth')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const saltRounds = process.env.SALT_ROUNDS;
const secret_key = process.env.JWT_SECRET_KEY
const expireMinutes = process.env.ADMIN_EXPIRE_MINUTES
const validate = require('../middleware/validation')
const { adminCreateSchema, adminLoginSchema, adminUpdateSchema} = require('../middleware/validation-schemas/admin')

router.post('/create', validate(adminCreateSchema), async (req, res,next)=>{
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

router.post('/login', validate(adminLoginSchema), async (req, res) => {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })

    if(!admin){
        res.status(404).send('Incorrect email.')
        return
    }

    const areSame = await bcrypt.compare(password, admin.password)

    if(!areSame){
        res.send('Incorrect password.')
        return
    }

    const token = jwt.sign({email: admin.email, isHeadAdmin: admin.isHeadAdmin, _id: admin._id.toString()}, secret_key, {expiresIn: 60 * expireMinutes})

    res.header('x-auth-token', token).send('The head admin has been successfully signed.')
})

router.post('/update', auth, validate(adminUpdateSchema), async (req, res) => {
    const {password, name, email, oldPassword} = req.body

    if(!req.admin.isHeadAdmin){
        res.send('You are not head admin')
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
            res.send('Incorrect password')
            return
        }

        admin.password = await bcrypt.hash(password, saltRounds)
    }

    if(name){
        admin.name = name
    }

    await Admin.findByIdAndUpdate(admin.id, admin)
    res.status(201).send('Successfully updated')
})

router.post('/delete', validate(adminLoginSchema), auth, async (req, res) => {
    const {password, email} = req.body

    const admin = await Admin.findOne({ email })

    if(!admin){
        res.send('Admin not found')
        return
    }

    const areSame = await bcrypt.compare(password, admin.password)

    if(!areSame){
        res.send('Incorrect password')
        return
    }

    await Admin.findByIdAndDelete(admin._id)
    res.status(200).send('Successfully deleted')
})

module.exports = router