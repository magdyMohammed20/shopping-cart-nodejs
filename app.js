var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var expressSession = require('express-session')
var connectFlash = require('connect-flash') // For Passing Messages Between Routers
var passport = require('passport')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ secret: 'Shopping-Cart_?@!', saveUninitialized: false, resave: false }))
app.use(connectFlash()) // Should Use connect-flash After expressSession()
app.use(passport.initialize()) // Should Initialize Passport After Parser , expressSession And Connect Flash
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));

mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)

mongoose.connect('mongodb://localhost/shopping-cart', err => {
  if (err) {
    console.log('Error In Connecting To MongoDB')
  } else {
    console.log('Connected Success To MongoDB')
  }
})
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
