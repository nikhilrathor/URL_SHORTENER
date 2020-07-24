const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
    FullUrl: {
        type: String,
        required: true
    },
    ShortUrl:{
        type: String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    },
    userid: {
        type: Object,
        required: true
    }
});

module.exports = Url = mongoose.model('url',UrlSchema);