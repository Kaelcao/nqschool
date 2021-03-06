require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var sass = require('node-sass-middleware');
var csrf = require('csurf');
var session = require('express-session');



require("./common/config/db");
require("./app/configs/passport");

var routes = require('./app/routes/index');
var routesApi = require("./app_api/routes/index");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, "app", 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(csrf());
app.use(passport.initialize());
app.use(passport.session());

app.use(sass({
    src: __dirname + '/sass',
    dest: __dirname + '/public',
    debug: true,
    outputStyle: 'compressed'
}));

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', function(req, res, next) {
    // put user into res.locals for easy access from templates
    res.locals.user = req.user || null;

    next();
});
app.use('/', routes);


app.use('/api', routesApi);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
