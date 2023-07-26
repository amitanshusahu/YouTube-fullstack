const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true,
    }
});

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;
