require('dotenv').config()
const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken')
const app = express();
const port = 3000;
const secret_key =  process.env.SECRET_KEY
const expireHours = 24
const server_api = process.env.SERVER_API


app.use(express.json());

app.post('/login', async (req, res) => {
    try {
        const clientData = req.body;

        const response = await axios.post(`${server_api}/client-user/login`, clientData);

        if(!response.data){
            return res.status(400).send('Something is wrong')
        }

        let token = response.headers['x-auth-token']

        token = jwt.sign({userId: token._id, schoolId: token.schoolId}, secret_key, {expiresIn: 60 * 60 * expireHours})

        res.header('x-auth-token', token).send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
