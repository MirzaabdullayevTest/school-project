const express = require('express')
const app = express()
const port = 8080
const host = 'localhost'

require('./helper/db')()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/admin', require('./routes/admin'))

app.listen(port, host, ()=>{
    console.log(`App listening on http://${host}:${port}`)
})