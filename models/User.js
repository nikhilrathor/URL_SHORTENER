const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        requiredPaths: true
    },
    email: {
        type: String,
        requiredPaths: true,
        unique: true
    },
    password: {
        type: String,
        requiredPaths: true
    },
    register_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user',UserSchema);