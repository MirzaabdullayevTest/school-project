const express = require('express')
const router = express.Router()
const User = require('../models/User')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const saltRounds = 10;
const secret_key = process.env.JWT_SECRET_KEY
const expireMinute = 10
const validate = require('../middleware/validation')
const {userCreateSchema, adminLoginSchema, adminUpdateSchema} = require("../middleware/validation-schemas/admin");

router.post('/create', validate(userCreateSchema), auth, async (req, res,next)=>{
    const {name, email, password} = req.body

    if(!req.admin.isHeadAdmin){
        res.send('You are not head admin')
        return
    }

    const candidate = await User.findOne({ email })

    if(candidate){
        res.send('This email is busy')
        return
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const user = new User({
        name, password: hashedPassword, email
    })

    await user.save()
    res.send('User created')
})

router.post('/login', validate(adminLoginSchema), async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if(!user){
        res.send('Incorrect email')
        return
    }

    const areSame = await bcrypt.compare(password, user.password)

    if(!areSame){
        res.send('Incorrect password')
        return
    }

    const token = jwt.sign({email: user.email, _id: user._id}, secret_key, {expiresIn: 60 * expireMinute})

    res.header('x-auth-token', token).send('The user has been successfully signed')
})

router.post('/update', validate(adminUpdateSchema), auth, async (req, res) => {
    const {password, name, email, oldPassword} = req.body

    const user = await User.findOne({ email })

    if(!user){
        res.send('User not exist with this email')
        return
    }

    if(password && oldPassword){
        const areSame = await bcrypt.compare(oldPassword, user.password)

        if(!areSame){
            res.send('Incorrect password')
            return
        }

        user.password = await bcrypt.hash(password, saltRounds)
    }

    if(name){
        user.name = name
    }

    await User.findByIdAndUpdate(user.id, user)
    res.send('Successfully updated')
})

router.post('/delete', validate(adminLoginSchema), auth, async (req, res)=>{
    const {password, email} = req.body

    const user = await User.findOne({ email })

    if(!user){
        res.send('User not found')
        return
    }

    const areSame = await bcrypt.compare(password, user.password)

    if(!areSame){
        res.send('Incorrect password')
        return
    }

    await User.findByIdAndDelete(user._id)
    res.status(200).send('Successfully deleted')
})

module.exports = router