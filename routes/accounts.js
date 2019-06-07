var express = require('express');
var router = express.Router();
var models = require('../models');/* 引進資料庫，“../”指回到上一層 */

/* GET users listing. 顯示create_account.ejs的雛形*/
router.get('/create', function(req, res, next) { /* get來自app.js的app.use值，路徑意思是/accounts/create */
  res.render('create_account'); /*回覆create_account.ejs的要求 */
});

/* 表單以post方式傳資料 */
router.post('/create',function(req,res,next){ 
	models.Account.create({  /*從資料庫取出Account資料表 */
		title: req.body.title,  /* 把使用者資料用‘req.body.欄位名稱’傳進去資料庫 */
		type: req.body.type,
		cost: req.body.cost
	}).then(function(){
		res.redirect('/');  //回首頁
	});
});


/*GET users listing. 顯示account.ejs的雛形*/
router.get('/:account_id',function(req,res,next){
  models.Account.findOne({
    where: { id : req.params.account_id }
    }).then(function(account){
           res.render('account',{ account : account });
       });
});


/* GET users listing. 顯示update_account.ejs的雛形*/
router.get('/:account_id/update',function(req,res,next){ /* get來自app.js的app.use值，:account_id來自index.ejs的id(新增消費時系統會自動生成id)，路徑意思是/accounts/數字/update */
    models.Account.findOne({ //findOne取出單一值
    	where: { id : req.params.account_id }  //where似ＳＱＬ條件限制,params是傳遞資料的一種方法，當:account_id等於id值，則顯示模板update_account.ejs的內容
     }).then(function(account){
        res.render('update_account',{ account : account }); //回覆模板update_account.ejs的要求，藍色account參數值來自function(account)
       });
    });

/* update_account.ejs更新 : 表單以post方式傳送修改後的資料，更新後回首頁*/
router.post('/:account_id/update',function(req,res,next){ /* post來自app.js的app.use值，:account_id來自index.ejs的id(新增消費時系統會自動生成id)，路徑意思是/accounts/數字/update */
    models.Account.findOne({ //findOne取出單一值
    	where: { id : req.params.account_id }  //where似ＳＱＬ條件限制,params是傳遞資料的一種方法，當:account_id等於id值，則顯示模板update_account.ejs的內容
     }).then(function(account){
            account.update({
               title: req.body.title,  /* 把資料用req.body.傳進來 */
		           type: req.body.type,
		           cost: req.body.cost
            });
     }).then(function(){
           res.redirect('/');  //回首頁
     });  
});


/* 刪除 */
router.post('/:account_id/delete',function(req,res,next){ /* post來自app.js的app.use值，:account_id來自index.ejs的id(新增消費時系統會自動生成id)，路徑意思是/accounts/數字/update */
    models.Account.destroy({
        where: { id : req.params.account_id }
    }).then(function(){
           res.redirect('/');  //回首頁
    });
});




module.exports = router;
