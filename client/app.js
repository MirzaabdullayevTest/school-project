const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/login', async (req, res) => {
    try {
        // Extract data from the client request
        const clientData = req.body;

        // Make a POST request to the backend API
        const response = await axios.post('http://34.122.230.168/api/client-user/login', clientData);

        // Send the response from the backend to the client
        res.json({
            token: response.headers['x-auth-token'],
            data: response.data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
