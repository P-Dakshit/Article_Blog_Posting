const logger = require('../utils/logger');

//printing body data before being used elseware
const requestLogger = (req, res, next) => {
  logger.info(`Request Body : ${JSON.stringify(req.body)}`);
  next();
};

module.exports = requestLogger;