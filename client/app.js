require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT;
const host = process.env.HOST;
const auth = require('./middleware/auth')


app.set('trust proxy', true);
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require('./middleware/logger'))
app.use('/auth', require('./routes/auth'));

app.use('/schedule', auth, require('./routes/schedule'))

app.use('/class', auth, require('./routes/class'))

app.use('/weekdays', auth, require('./routes/weekdays'))

app.use('/table', auth, require('./routes/table'))

app.use(function (req, res, next) {
   return res.send(404)
});

app.listen(port, host, () => {
    console.log(`App listening on http://${host}:${port} || ${new Date()}`);
});
