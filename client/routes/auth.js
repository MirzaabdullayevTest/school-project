const axios = require("axios");
const jwt = require("jsonwebtoken");
const router = require('express').Router()
const secret_key =  process.env.SECRET_KEY
const server_secret_key =  process.env.SERVER_SECRET_KEY
const expireHours = 24
const server_api = process.env.SERVER_API


router.post('/login', async (req, res) => {
    try {
        if(!req.body.email || !req.body.password){
            return res.status(400).send('Email or password is empty')
        }

        const clientData = req.body;

        const response = await axios.post(`${server_api}/client-user/login`, clientData);

        if(!response.data){
            return res.status(400).send('Something is wrong')
        }

        let token = response.headers['x-auth-token']

        try{
            req.user = jwt.verify(token, server_secret_key)
        }catch (e){
            return res.send('Invalid token or secret key')
        }

        token = jwt.sign({_id: req.user._id, schoolId: req.user.schoolId, token}, secret_key, {expiresIn: 60 * 60 * expireHours})

        res.header('x-auth-token', token).send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = router