const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('../../config/key');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ msg: "Please Enter All fields" });
    }

    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: "User already exists" });
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

                    jwt.sign(
                        { id: user.id },
                        config.jwtSecret,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;

                            res.json({
                                token,
                                user:
                                {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        })
                });
        });
    });

});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Please Enter All fields" });
    }

    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: "User Does Not exist" });

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

                    jwt.sign(
                        { id: user.id },
                        config.jwtSecret,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;

                            res.json({
                                token,
                                user:
                                {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        })
                })
        })
});

router.get('/getUser', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});


module.exports = router;