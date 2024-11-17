var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//const normalizePort = require('./bin/www').normalizePort; 

var indexRouter = require('./routes/index');
var accountsRouter = require('./routes/accounts');  //將這個路由掛載到主應用中

//var port = normalizePort(process.env.PORT || '5001');  //Heroku 自動將 process.env.PORT 設定為有效端口，不需要在官網手動設置

//const models = require('./models');

var app = express();
// const port = 5001;  // 設置為 5001

// const models = require('./models');
// models.sequelize.sync().then(() => {
//   app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
//   });
// });

//前端和伺服器在不同的端口，跨域用
const cors = require('cors');
app.use(cors({
  //origin: 'http://localhost:3000'  // 允許從 3000 端口發送請求
  origin: ['http://localhost:3000', 'https://spending-front-6701f9791b04.herokuapp.com']
}));

// EJS views 渲染相關的
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());  //使用 JSON 解析中介軟體
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  //靜態文件伺服

app.use('/', indexRouter);      // 處理根路徑，並將它們轉發到 routes/index.js
app.use('/accounts',accountsRouter);  // 掛載路由，處理以 /accounts 開頭的路徑，，並將它們轉發到 routes/accounts.js。 

// 處理 404 錯誤，當沒有匹配的路由時會進入這個中間
app.use(function(req, res, next) {
  next(createError(404));
});

// error
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  //res.render('error');
  res.json({ message: 'Error' }); 
  //console.log('Error')
});

module.exports = app;


