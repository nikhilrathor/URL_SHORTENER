const express = require('express');
const router = express.Router();
const SHORT_URL = require('node-url-shortener');
const auth = require('../../middleware/auth');

const Url = require('../../models/Url');

router.get('/:userid', auth, (req, res) => {
    const user = req.params.userid;
    Url.find({ userid: user })
        .sort({ date: -1 })
        .then(urls => res.json(urls));
});

router.post('/', auth, (req, res) => {
    SHORT_URL.short(req.body.url, (err, shortUrl) => {
        if (err) {
            res.status(400).json(err);
        }
        const newUrl = new Url({
            FullUrl: req.body.url,
            userid: req.body.userid,
            ShortUrl: shortUrl
        });
        newUrl.save()
            .then(url => res.json(url));
    })
});

router.delete('/:id', auth, (req, res) => {
    Url.findByIdAndDelete(req.params.id)
        .then(url => res.json({ success: true }))
        .catch(err => res.status(404).json({ success: false }))
});


module.exports = router;