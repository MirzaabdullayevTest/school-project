const axios = require("axios");
const router = require('express').Router()
const server_api = process.env.SERVER_API


router.get('/get', async (req, res)=>{
    try{
        const headers = {
            'x-auth-token': req.user.token
        }

        const response = await axios.get(`${server_api}/schedule/get/${req.user.schoolId}`, { headers })

        if(!response.data){
            return res.status(400).send('Something is wrong')
        }

        res.status(200).json(response.data)
    }catch (error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router