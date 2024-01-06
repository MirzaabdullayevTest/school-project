require('dotenv').config()
const express = require('express')
const auth = require("./middleware/auth");
const app = express()
const port = 8080
const host = 'localhost'


app.set('trust proxy', true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./middleware/logger'))

app.use('/api/admin', require('./routes/admin'))
app.use('/api/user', require('./routes/user'))
app.use('/api/client-user', require('./routes/client-user'))

app.use('/api/school', auth, require('./routes/school'))
app.use('/api/schedule', auth, require('./routes/schedule'))
app.use('/api/class', auth, require('./routes/class'))
app.use('/api/table', auth, require('./routes/table'))
app.use('/api/weekdays', auth, require('./routes/week-days'))

app.use(function (req, res, next) {
   return res.send(404)
});

app.listen(port, host, async () => {
    await require('./helper/db')()
    console.log(`App listening on http://${host}:${port} || ${new Date()}`)
})