const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { secretkey } = require('../modules/jwt');

module.exports.signup = async (req, res) => {
    const { username, password } = req.body;

    let user = await userModel.findOne({ username, password });

    const token = jwt.sign({ username }, secretkey);
    if (user) res.status(200).json({ status: false, msg: 'user already exits' });
    else {
        await userModel.create({ username, password });
        res.status(400).json({ status: true, token});
    }
}

module.exports.login = async (req, res) => {
    const { username, password } = req.body;

    let user = await userModel.findOne({ username, password });

    const token = jwt.sign({ username }, secretkey);
    if (user) res.status(200).json({ status: true, token });
    else res.status(400).json({ status: false, msg: 'Invalid Username or Password' });
}
