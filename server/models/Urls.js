const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
    UserEmail: {
        type: String,
        required: true
    },
    FullUrl: {
        type: String,
        required: true
    },
    ShortUrl: {
        type: String,
        required: true
    }
});

module.exports = Url = mongoose.model('url',UrlSchema);