const {
    JWT_SECRET
} = process.env;
const jwt = require('jsonwebtoken');

async function restrict(req, res, next) {
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token.slice(7), JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

async function isAdmin(req, res, next) {
    if (req.user.role !== 'ROLE_ADMIN') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
}

async function isLecturer(req, res, next) {
    if (req.user.role !== 'ROLE_LECTURER') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
}

module.exports = { restrict, isAdmin, isLecturer };