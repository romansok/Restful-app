var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

var routes = require('./routes/index');
var userData = require('./routes/userData');
var addUsr = require('./routes/addUsr');
var task = require('./routes/task');
var post = require('./routes/post');
var addPst = require('./routes/addPst');
var addTsk = require('./routes/addTsk');

var seeds = require('./seeds');

var app = express();

require('./configs/database');


seeds.seedDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));

//routes
app.use('/', routes);
app.use('/user', userData);
app.use('/add_user', addUsr);
app.use('/add_task', addTsk);
app.use('/add_post', addPst);
app.use('/task', task);
app.use('/post', post);




/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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


module.exports = app;
