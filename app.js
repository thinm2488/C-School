var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

require('./api/model/User');
require('./api/model/Notification');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRouter = require('./api/route/user')
var notiRouter = require('./api/route/notification')

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(process.cwd() + '/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(process.cwd() + '/public')));
app.use(session({
  secure: true,
  httpOnly: true,
  secret: 'asdqwe',
  resave: false,
  saveUninitialized: true
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/route/user', userRouter)
app.use('/api/route/notification', notiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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


//Nhập mô-đun mongoose
var mongoose = require('mongoose');

//Thiết lập một kết nối mongoose mặc định
var mongoDB = 'mongodb://s-chool:Thach2106@ds263816.mlab.com:63816/c-school';
mongoose.connect(mongoDB,{ useNewUrlParser: true });
//Ép Mongoose sử dụng thư viện promise toàn cục
mongoose.Promise = global.Promise;
//Lấy kết nối mặc định
var db = mongoose.connection;

//Ràng buộc kết nối với sự kiện lỗi (để lấy ra thông báo khi có lỗi)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//Kết nối firebase
var firebase = require('firebase');
var config = {
  apiKey: "AIzaSyBCon2O9GDH82NiGHI5E5gs64HEyV9sDf0",
  authDomain: "c-school-apps.firebaseapp.com",
  databaseURL: "https://c-school-apps.firebaseio.com",
  projectId: "c-school-apps",
  storageBucket: "",
  messagingSenderId: "353430333264",
  appId: "1:353430333264:web:ea7d5f99891fa0d0"
};
firebase.initializeApp(config);