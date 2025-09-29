// middleware/adminOnly.js
const logger = require('../utils/logger');

const adminOnly = (req, res, next) => {
    if (!req.user) {
        logger.info('Unauthorized access attempt - no user in request');
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.user.role !== 'admin') {
        logger.info(`Access denied for user id=${req.user.id}, role=${req.user.role}`);
        return res.status(403).json({ error: 'Admin access required' });
    }

    next();
};

module.exports = adminOnly;