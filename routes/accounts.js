var express = require('express');
var router = express.Router();
var models = require('../models'); //資料庫

// 渲染 EJS 等視圖模板，顯示create_account.ejs的雛形
// router.get('/create', function(req, res, next) { // get來自app.js的app.use值，路徑意思是/accounts/create 
//   res.render('create_account'); // 回覆create_account.ejs的要求 
// });

// 處理來自 /create 路徑的請求 (表單)
// axios.post('http://localhost:5001/accounts/create', { title, type, cost, date },{
router.post('/create', (req, res) => {
  models.Account.create({   //在資料庫中建新的 Account 資料表記錄
    title: req.body.title,  //接收表單 title 值
    type: req.body.type,
    cost: req.body.cost,
    // date: req.body.date || new Date()   //接收表單 date 值，若無則使用當天日期
    date: req.body.date || ''
  })
  .then(() => {
    //res.redirect('/');  //回首頁
    console.log('List created successfully');
    res.status(200).send({ success: true });
  })
  .catch(error => {
    console.error('error create: ', error);
    res.status(500).send({ success: false, error: error.message });
  });
});



// 渲染 EJS 等視圖模板，顯示account.ejs的雛形，取得單一消費資料，根據 URL 中的 account_id 來找到特定的消費
// router.get('/:account_id',function(req,res,next){
//   models.Account.findOne({
//     where: { id : req.params.account_id }
//     }).then(function(account){
//            res.render('account',{ account : account });
//        });
// });

// fetch(`http://localhost:5001/accounts/${id}`)
router.get('/:account_id', async (req, res) => {
  try {
    const account = await models.Account.findOne({
      where: { id: req.params.account_id }
    });

    if (account) {
      res.json(account);  // 回傳 JSON 格式的消費紀錄
    } else {
      res.status(404).json({ message: '未找到此消費資料' });  // 消費找不到時回傳 404 錯誤
      console.log('未找到此消費資料')
    }
  } catch (error) {
    res.status(500).json({ error: '伺服器錯誤' });  // 伺服器錯誤時回傳 500 錯誤
    console.log('伺服器錯誤')
  }
});


// 取得所有消費資料
//axios.get('http://localhost:5001/accounts
router.get('/', async (req, res) => {
    try {
      const accounts = await models.Account.findAll();  // 從資料庫中取得所有消費資料
      res.json(accounts);  // 返回 JSON 格式的消費資料
    } catch (error) {
      res.status(500).json({ error: '無法取得消費資料' });
      console.log('無法取得消費資料')
    }
  });
  


// 渲染 EJS 等視圖模板，顯示update_account.ejs的雛形
// router.get('/:account_id/update',function(req,res,next){ /* get來自app.js的app.use值，:account_id來自index.ejs的id(新增消費時系統會自動生成id)，路徑意思是/accounts/數字/update */
//     models.Account.findOne({ //findOne取出單一值
//     	where: { id : req.params.account_id }  //where似ＳＱＬ條件限制,params是傳遞資料的一種方法，當:account_id等於id值，則顯示模板update_account.ejs的內容
//      }).then(function(account){
//         res.render('update_account',{ account : account }); //回覆模板update_account.ejs的要求，藍色account參數值來自function(account)
//        });
//     });

//axios.post(`http://localhost:5001/accounts/${id}/update
// update_account.ejs更新 : 以post傳送修改後的資料
router.post('/:account_id/update', function(req, res, next) {
  models.Account.findOne({
    where: { id: req.params.account_id }
  })
  .then(function(account) {
    if (!account) {
      return res.status(404).send('this account not found');
    }
    return account.update({
      title: req.body.title,
      type: req.body.type,
      cost: req.body.cost,
      // date: req.body.date || new Date()
      date: req.body.date || ''
    });
  })
  .then(function() {
    res.json({ message: 'this account updated successfully' }); // 發送成功響應
  })
  .catch(function(error) {
    next(error); // 處理錯誤
  });
});


// 刪除
//await axios.post(`http://localhost:5001/accounts/${accountId}/delete`);
router.post('/:account_id/delete', function(req, res, next) { 
  models.Account.destroy({
    where: { id: req.params.account_id }
  }).then(function() {
    // res.redirect('/');  //回首頁
    console.log('List deleted successfully');
    res.status(200).send({ success: true }); 
  }).catch(function(error) {
    console.error('error delete:', error);
    res.status(500).send({ success: false, error: error.message });
  });
});




module.exports = router;
