const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
})

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;
