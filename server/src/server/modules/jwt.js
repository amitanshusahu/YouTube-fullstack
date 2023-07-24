const jwt = require('jsonwebtoken');

module.exports.protect = (req, res, next ) => {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({status: false, msg: "no token provided"});

    //verify the token 
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({status: false, msg: "authorization failed"});

        req.user = decoded;
        next();
    })
}
