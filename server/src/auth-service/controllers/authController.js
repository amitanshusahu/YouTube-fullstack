const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

module.exports.signup = async (req, res) => {
    const { username, password } = req.body;

    let user = await userModel.findOne({ username, password });

    const token = jwt.sign({ username }, process.env.SECRET_KEY);
    if (user) res.status(200).json({ status: false, msg: 'user already exits' });
    else {
        await userModel.create({ username, password });
        res.status(400).json({ status: true, token});
    }
}

module.exports.login = async (req, res) => {
    const { username, password } = req.body;

    let user = await userModel.findOne({ username, password });

    const token = jwt.sign({ username }, process.env.SECRET_KEY);
    if (user) res.status(200).json({ status: true, token });
    else res.status(400).json({ status: false, msg: 'Invalid Username or Password' });
}
