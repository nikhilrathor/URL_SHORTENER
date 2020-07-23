const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/key');
const user = require('./routes/api/user');
const urls = require('./routes/api/urls');

const app = express();

app.use(express.json());

mongoose.connect(config.mongoURI,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use('/api/user', user);
app.use('/api/urls', urls);

if (process.env.NODE_ENV === 'production') {
    app.listen(process.env.PORT, '0.0.0.0');
} else {
    const port = 8000;
    app.listen(port, () => { console.log(`server started at port ${port}`) });
}