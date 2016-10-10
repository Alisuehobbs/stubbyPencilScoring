'use strict'
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session')
const morgan = require('morgan');
const app = express();

switch (app.get('env')) {
    case 'development':
        app.use(morgan('dev'));
        break;

    case 'production':
        app.use(morgan('short'));
        break;

    default:
}

const index = require('./routes/index')
const signup = require('./routes/signup')
const login = require('./routes/login')
const profile = require('./routes/profile')
const creategame = require('./routes/creategame')
const scorecard = require('./routes/scorecard')



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieSession({
    name: 'stubbypencilscoring',
    secret: process.env.SESSION_SECRET,
    secureProxy: app.get('env') === 'production'
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/signup', signup);
app.use('/login', login);
app.use('/profile', profile);
app.use('/creategame', creategame);
app.use('/scorecard', scorecard);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


const port = process.env.PORT || 8000;

app.listen(port, () => {
  if (app.get('env') !== 'test') {
    // eslint-disable-next-line no-console
    console.log('Listening on port', port);
  }
});
module.exports = app;
