var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require("express-session");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var db=require("./config/connection");
var exphbs = require('express-handlebars');
var app = express();

app.use(session({
  resave: true,
  saveUninitialized: false,
  secret:"key",cookie:{maxAge:600000}
  // Other session options...
}));


db.connect()

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
const handlebarsHelpers = {
  range: function(start, end) {
    let result = '';
    for (let i = start; i < end; ++i) {
      result += `
        <div class="seat">
          <input type="checkbox" id="seat${i}" name="seats" value="${i}">
          <label for="seat${i}">${i}</label>
        </div>`;
    }
    return result;
  },
  eq: function(a, b) {
    return a === b;
  },
  gt: function(a, b) {
    return a > b;
  }
};
app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  defaultLayout: 'normalLayout',
  layoutsDir: path.join(__dirname, 'views', 'layout'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  helpers: handlebarsHelpers
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
