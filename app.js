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
const knex = require('./db/knex');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const configAuth = require('./public/config/auth');

const app = express();

app.use(passport.initialize());
app.use(cookieSession({
    name: 'stubbypencilscoring',
    secret: process.env.SESSION_SECRET,
    secureProxy: app.get('env') === 'production'
}));

function findOrCreate(profile, callback) {
    console.log('You made it to the findOrCreate function');
    knex('users')
        .where('email', profile.emails[0].value)
        .first()
        .then((user) => {
            if (user) {
                console.log('There is a user with this email.');
                knex('users')
                    .where('email', profile.emails[0].value)
                    .first()
                    .then((user) => {
                        callback(null, user);
                    })
            } else {
                console.log('There is no user with the email. You are prepared to enter stuff into the database');
                knex('users')
                    .insert({
                        first_name: profile._json.first_name,
                        last_name: profile._json.last_name,
                        email: profile.emails[0].value,
                        user_name: profile._json.name,
                        image: profile._json.link
                    }, '*')
                    .then((user) => {
                        knex('users')
                            .where('email', profile.emails[0].value)
                            .first()
                            .then((user) => {
                                callback(null, user);
                            })
                    })
            }
        })
};

passport.use(new FacebookStrategy({
        clientID: configAuth.clientID,
        clientSecret: configAuth.clientSecret,
        callbackURL: configAuth.callbackURL,
        profileFields: ['email', 'name', 'displayName', 'profileUrl'],
        enableProof: true,
        passReqToCallback: true
    },

    function(req, accessToken, refreshToken, profile, cb1) {
        findOrCreate(profile, (err, user) => {
            req.session.userInfo = user;
            return cb1(null, user);
        });
    }
))

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

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
const logout = require('./routes/logout')

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

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/signup', signup);
app.use('/login', login);
app.use('/profile', profile);
app.use('/creategame', creategame);
app.use('/scorecard', scorecard);
app.use('/logout', logout);


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
