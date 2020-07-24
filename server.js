const express = require('express');
const mongoose = require('mongoose');
const urls = require('./routes/api/urls');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const path = require('path');
const config = require('./config/key');

const app = express();

app.use(express.json());

const db = config.mongoURI;

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use('/api/urls', urls);
app.use('/api/users', users);
app.use('/api/auth', auth);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));