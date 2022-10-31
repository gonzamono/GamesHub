let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let cartRouter = require('./routes/cart');
let loginRouter = require('./routes/login');
let registerRouter = require('./routes/register');
let productRouter = require('./routes/product');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

app.use('/', indexRouter);
app.use('/cart', cartRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/product', productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).render('not-found')
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
