var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var commone = require('./util/common');
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();
var checkLogin = require('./middleware/checkLogin');
var parseQueryString = require('./middleware/parseQueryString');
var checkIndentify = require('./middleware/checkIndentify');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(parseQueryString);
// 设置静态资源文件夹
app.use(express.static(path.join(__dirname, 'public')));
// 验证
app.use(checkLogin); // 验证是否登录
app.use(checkIndentify);  //   验证身份
app.use('/', index);
app.use('/users', users);
app.get('/self',(req,res)=>{
  res.send('ok')
})


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
  res.send(err);
});

module.exports = app;
