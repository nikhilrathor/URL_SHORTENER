const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('../../config/key');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: "Email Id already registered!" });
        })

    const newUser = new User({
        name,
        email,
        password
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
                .then(user => {
                    jwt.sign({ email: user.email }, config.jwtSecret, { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({ token, user: user.name });
                        })
                });
        });
    });

});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: "User Does Not exist" });

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

                    jwt.sign({ email: user.email }, config.jwtSecret, { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({ token, user: user.name });
                        })
                })
        })
});

router.get('/getUser', auth, (req, res) => {
    User.findOne({ email: req.user.email })
        .then(user => res.json(user.name));
});

module.exports = router;