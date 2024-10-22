var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
// router.get('/', function(req, res, next) {  // 處理來自根路徑 / 的 GET 請求
//     models.Account.findAll().then(function(accounts){   //會去資料庫中查詢所有的 Account，並將這些資料傳遞給 index.ejs 作為模板引擎來渲染
//        res.render('index', {    // 對應 views 資料夾的 index.ejs
//            title: 'Tracking your spending',
//            accounts: accounts  
//            });
//     });
// });

//保留 API 端點以提供資料
router.get('/', function(req, res, next) {
    models.Account.findAll().then(function(accounts) {
      res.json(accounts);  // 返回 JSON 而不是渲染模板
    }).catch(function(error) {
      next(error);
    });
  });

module.exports = router;
