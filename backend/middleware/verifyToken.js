const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: `no token Found!` });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: `invalid token format` });
    }

    try {
        const decode = jwt.verify(token, process.env.JSONTOKEN);
        req.user = decode;
        next();
    }
    catch (err) {
        return res.status(403).json({ error: `Invalid or Expired Token!` });
    }
}

module.exports = verifyToken;