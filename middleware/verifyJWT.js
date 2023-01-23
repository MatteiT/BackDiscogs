const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.UserInfo.username
        req.roles = decoded.UserInfo.roles
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Forbidden' });
    }
}

module.exports = verifyJWT 
