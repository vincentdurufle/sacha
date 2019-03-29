var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
var session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
require('./controllers/userController');
const User = mongoose.model('User');
const oneYear = 60 * 1000 * 60 * 24 * 365;
const xssFilter = require('x-xss-protection');
const noSniff = require('dont-sniff-mimetype');
require('dotenv').config({ path:"process.env"});
const compression = require('compression');
var indexRouter = require('./routes/index');



var app = express();
app.use(xssFilter());
app.use(noSniff());
app.use(compression());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public', {maxAge: oneYear, dotfiles:'allow'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  maxAge: 200000
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({
      username
    }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (user.password != password) {
        return done(null, false);
      }
      return done(null, user);
    });
  }))

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


app.use('/', indexRouter);

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