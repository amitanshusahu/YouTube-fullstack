const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        unique: true,
        require: true,
    }
})

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;
