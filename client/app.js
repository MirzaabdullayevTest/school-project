require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require('./middleware/logger'))
app.use('/auth', require('./routes/auth'));

app.use(require('./middleware/auth'))

app.use('/schedule', require('./routes/schedule'))

app.use('/class', require('./routes/class'))

app.use('/weekdays', require('./routes/weekdays'))

app.use('/table', require('./routes/table'))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
