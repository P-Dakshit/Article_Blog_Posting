const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

//imported
const logger = require('./utils/logger');
const requestLogger = require('./middleware/requestLogger');
const indexRoutes = require('./routes/indexRouter');
require('dotenv').config();

//app
const PORT = process.env.PORT;
const app = express();

//database
require('./connection/db');

//middleware
app.use(helmet({
    crossOriginResourcePolicy: false, // allow cross-origin <img> loads
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//created middleware
app.use(requestLogger);
app.use('/uploads', express.static(path.join(__dirname, 'upload')))

//frontend connections
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));

//routes
app.use('/api', indexRoutes);

//listen
app.listen(PORT, () => logger.info(`Server Started at ${PORT}`));