var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) { /* get來自app.js的app.use值，路徑'/'意思是/accounts */
    models.Account.findAll().then(function(accounts){ //findＡll取出所有的值
       res.render('index', { /*回覆views資料夾的index.ejs的要求：顯示被新增的消費，操作更新與操作刪除 */
           title: '小資女愛記帳',
           accounts: accounts //藍色accounts參數值來自function(account)
           });
    });
});

module.exports = router;
