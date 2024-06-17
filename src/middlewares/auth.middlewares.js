const {
    JWT_SECRET
} = process.env;
const jwt = require('jsonwebtoken');

async function restrict(req, res, next) {
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({
            status: false,
            message: 'No token provided',
            error: null,
            data: null
        });
    }

    try {
        const decoded = jwt.verify(token.slice(7), JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: 'Invalid token',
            error: null,
            data: null
        });
    }
};

async function isAdmin(req, res, next) {
    if (req.user.role !== 'ROLE_ADMIN') {
        return res.status(403).json({
            status: false,
            message: 'Access denied. Only admin can access this route',
            error: null,
            data: null
        });
    }
    next();
}

async function isLecturer(req, res, next) {
    if (req.user.role !== 'ROLE_LECTURER') {
        return res.status(403).json({
            status: false,
            message: 'Access denied. Only lecturer can access this route',
            error: null,
            data: null
        });
    }
    next();
}

module.exports = { restrict, isAdmin, isLecturer };