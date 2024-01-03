const express = require('express')
const auth = require("./middleware/auth");
const app = express()
const port = 8080
const host = 'localhost'

require('dotenv').config()

require('./helper/db')()

app.set('trust proxy', true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/admin', require('./routes/admin'))
app.use('/api/user', require('./routes/user'))

app.use(auth)
app.use('/api/school', require('./routes/school'))
app.use('/api/schedule', require('./routes/schedule'))
app.use('/api/class', require('./routes/class'))
app.use('/api/table', require('./routes/table'))

app.listen(port, host, ()=>{
    console.log(`App listening on http://${host}:${port}`)
})