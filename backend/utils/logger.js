const { createLogger, format, transports } = require('winston');
const path = require('path');
const fs = require('fs');

const logDiv = path.join(__dirname, '../Logs');
if (!fs.existsSync(logDiv)) { fs.mkdirSync(logDiv) };

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: `YYYY-MM-DD HH:mm:ss` }),
        format.printf(({ level, timestamp, message }) => `${timestamp} [${level.toUpperCase()}] : ${message}`)
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: path.join(logDiv, 'app.log') }),
        new transports.File({ filename: path.join(logDiv, 'error.log'), level: 'error' })
    ]
});

module.exports = logger;