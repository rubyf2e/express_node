require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var webUrl =  process.env['WEB_URL'];

app.use(function (req, res, next) {
  req.requestTime = Date.now();
  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var router = express.Router();
var indexRouter = require('./routes/index');
var dishesRouter = require('./routes/dishes');
var ingredientsRouter = require('./routes/ingredients');

router.use('/', indexRouter);
router.use('/dishes', dishesRouter);
router.use('/ingredients', ingredientsRouter);

app.use('/'+process.env['DEFAULT_PATH'], router);

app.use('/'+process.env['DEFAULT_PATH']+'/public', express.static(path.join(__dirname,  '/public')));
app.use('/'+process.env['DEFAULT_PATH']+'/node_modules/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap')));
app.use('/'+process.env['DEFAULT_PATH']+'/node_modules/bootstrap-icons', express.static(path.join(__dirname, '/node_modules/bootstrap-icons')));

app.use(function(req, res, next) {
  res.status(404);
  res.render('404');
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = process.env['NODE_ENV'] === 'dev' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

if (process.env['NODE_ENV'] === 'dev') {
  var livereload = require('livereload');
  var connectLiveReload = require('connect-livereload');

  const liveReloadServer = livereload.createServer();
  liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/');
    }, 100);
  });

  app.use(connectLiveReload());
}

module.exports = app;
