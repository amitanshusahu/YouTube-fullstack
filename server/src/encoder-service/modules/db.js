const mongoose = require('mongoose');

module.exports = function db() {
    mongoose.connect(process.env.MONGODB_URI)
    .then( d => {
        console.log('db connection sucess');
    })
    .catch( e => {
        console.log(e);
    })
}
