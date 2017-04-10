const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const hbs = require('handlebars');

const Keycloak = require('keycloak-connect');
const keycloak = new Keycloak({});

//const landingPage = require('./views/index.html');
const graphController = require('./api-controller/graphs');

var app = express();
app.use(keycloak.middleware());


// serves any requests for resources/ images in the url www.x.com/123.jpg from the public directory
app.use(express.static('public'));

// serves any requests for resources/ images in the url www.x.com/static/123.jpg from the public directory
app.use('/static', express.static('public'));

// the path provided to the express.static function is relative to the directory where node is
// launched from, thus path.join is used to map the absolute path to public
app.use('/static', express.static(path.join(__dirname, 'public')))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', hbs);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/views')));


app.get('/login', keycloak.protect(), function(req, res) {
  res.sendFile(index.html);
});
app.use('/graphs', graphController);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(8000);
console.log('listening on http://localhost:' + '8000');

module.exports = app;
