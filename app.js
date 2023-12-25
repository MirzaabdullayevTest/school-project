const express = require('express')
const app = express()
const port = 8080
const host = 'localhost'

app.get('/', (req,res)=>{
    res.send('Hello World')
})

app.listen(port, host, ()=>{
    console.log(`App listening on http://${host}:${port}`)
})