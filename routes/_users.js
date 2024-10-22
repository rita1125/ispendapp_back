var express = require('express');
var router = express.Router();
var models = require('../models');

// 渲染 EJS 模板的路由
// router.get('/create', function(req, res, next) {
//   res.render('create_account');
// });

// router.post('/create',function(req,res,next){
// 	console.log(req.body);
// 	models.Account.create({
// 		title: req.body.title,
// 		type: req.body.type,
// 		cost: req.body.cost,
// 		date: req.body.date || new Date()
// 	}).then(function(){
// 		res.redirect('/');  //回首頁
// 	});
// })

router.post('/create', function(req, res, next) {
	models.Account.create({
	  title: req.body.title,
	  type: req.body.type,
	  cost: req.body.cost,
	  date: req.body.date || new Date()
	}).then(function() {
	  res.redirect('/');  // 如果需要，可以改為返回 JSON 或其他狀態
	}).catch(function(error) {
	  next(error);
	});
  });

module.exports = router;
