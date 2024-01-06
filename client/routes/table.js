const axios = require("axios");
const router = require('express').Router()
const server_api = process.env.SERVER_API


router.get('/get/:classId/:dayId', async (req, res) => {
    try{
        const headers = {
            'x-auth-token': req.user.token
        }

        if(req.params.dayId.length !== 24 || req.params.classId.length !== 24){
            return res.status(400).send('ClassId or dayId is incorrect')
        }

        const response = await axios.post(`${server_api}/table/get/`, { dayId: req.params.dayId, classId: req.params.classId }, { headers })

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