const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const SHORT_URL = require('node-url-shortener');
const Url = require('../../models/Urls');

router.get('/getUrls', auth, (req, res) => {
    const userEmail = req.user.email;
    Url.find({ UserEmail: userEmail }, { FullUrl: 1, ShortUrl: 1 })
        .then(urls=>res.status(200).json(urls))
});

router.post('/addUrl', auth, (req, res) => {
    var fullUrl = req.body.fullUrl;
    var userEmail = req.user.email;
    SHORT_URL.short(fullUrl, (err, shortUrl) => {
        if (err) {
            res.status(404).json(err)
        }
        const newUrl = new Url({
            FullUrl: fullUrl,
            ShortUrl: shortUrl,
            UserEmail: userEmail
        });
        newUrl.save()
            .then(url => res.status(200).json(url))
            .catch(err => res.status(404).json(err))
    });
});


module.exports = router;