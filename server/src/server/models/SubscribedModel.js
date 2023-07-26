const mongoose = require('mongoose');

const subscribedShcma = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    subscribed: []
});

module.exports = mongoose.model("subscribedModel", subscribedShcma);