require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;
const auth = require('./middleware/auth')


app.set('trust proxy', true);

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
