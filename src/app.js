const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const indexRouter = require('./routes/v1/index');

const app = express();

connectDB();
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

const whiteList = ['http://127.0.0.1:3000', 'http://localhost:3000', 'https://little-tags-pesto.netlify.app'];
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }
      const message = `The CORS policy for this origin doesn't 
    allow access from the particular origin.`;
      if (!whiteList.includes(origin)) {
        return callback(new TypeError(message), false);
      }
      return callback(null, true);
    },
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('PAGE NOT FOUND');
});

module.exports = app;