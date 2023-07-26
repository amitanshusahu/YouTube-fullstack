const mongoose = require('mongoose');

const subscriberShcma = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    subscribers: []
});

module.exports = mongoose.model("subscriberModel", subscriberShcma);