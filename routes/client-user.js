const express = require('express')
const router = express.Router()
const ClientUser = require('../models/ClientUser')
const School = require('../models/School')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const saltRounds = process.env.SALT_ROUNDS;
const secret_key = process.env.JWT_SECRET_KEY
const expireMinutes = process.env.CLIENT_USER_EXPIRE_MINUTES
const validate = require('../middleware/validation')
const {adminLoginSchema, clientUserCreateSchema, clientUserUpdateSchema} = require("../middleware/validation-schemas/admin");


router.post('/create', validate(clientUserCreateSchema), auth, async (req, res) => {
    const {name, email, password, schoolId} = req.body

    if(!req.admin.isHeadAdmin){
        res.send('You are not head admin')
        return
    }

    const school = await School.findById(schoolId)

    if(!school){
        return res.status(400).send('This school is not exist')
    }

    const candidate = await ClientUser.findOne({ email })

    if(candidate){
        res.send('This email is busy')
        return
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const clientUser = new ClientUser({
        name, password: hashedPassword, email, schoolId
    })

    await clientUser.save()
    res.status(200).send('Client user created')
})

router.post('/login', validate(adminLoginSchema), async (req, res) => {
    const { email, password } = req.body

    const clientUser = await ClientUser.findOne({ email })

    if(!clientUser){
        res.status(400).send('Incorrect email')
        return
    }

    const areSame = await bcrypt.compare(password, clientUser.password)

    if(!areSame){
        res.send('Incorrect password')
        return
    }

    const token = jwt.sign({schoolId: clientUser.schoolId, _id: clientUser._id.toString()}, secret_key, {expiresIn: 60 * expireMinutes})

    res.header('x-auth-token', token).send('The client-user has been successfully logged in')
})

router.post('/update', validate(clientUserUpdateSchema), auth, async (req, res) => {
    const {password, name, email, oldPassword, schoolId} = req.body

    if(!req.admin.isHeadAdmin){
        res.send('You are not head admin')
        return
    }

    const clientUser = await ClientUser.findOne({ email })

    if(!clientUser){
        return res.status(400).send('User not exist with this email')
    }

    if(password && oldPassword){
        const areSame = await bcrypt.compare(oldPassword, clientUser.password)

        if(!areSame){
            res.send('Incorrect password')
            return
        }

        clientUser.password = await bcrypt.hash(password, saltRounds)
    }

    if(name){
        clientUser.name = name
    }

    if(schoolId){
        clientUser.schoolId = schoolId
    }

    await ClientUser.findByIdAndUpdate(clientUser._id, clientUser)
    res.status(200).send('Successfully updated')
})

router.post('/delete', validate(adminLoginSchema), auth, async (req, res)=>{
    const {password, email} = req.body

    const clientUser = await ClientUser.findOne({ email })

    if(!clientUser){
        res.send('User not found')
        return
    }

    const areSame = await bcrypt.compare(password, clientUser.password)

    if(!areSame){
        res.send('Incorrect password')
        return
    }

    await ClientUser.findByIdAndDelete(clientUser._id)
    res.status(200).send('Successfully deleted')
})

module.exports = router