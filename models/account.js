"use strict";
// SQLite3 : 輕量級的嵌入式資料庫，不需要獨立的伺服器程式。資料存放在一個本地檔案中，非常適合小型應用或測試環境
// sequelize : 使用 JavaScript 來描述資料表結構，而不需要直接編寫 SQL 語句
// 定義了一個 Account 模型對應資料庫中的 Account 表。sequelize 是 Sequelize 的實例，用來和資料庫互動
module.exports = function(sequelize, DataTypes){
    var Account = sequelize.define('Account',{
    // title: DataTypes.STRING,
    // type: DataTypes.STRING,
    // cost: DataTypes.STRING,
    title: {
        type: DataTypes.STRING,
        allowNull: false, //不可為空
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cost: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,     // 儲存日期 ，不含時間
        defaultValue: DataTypes.NOW,  // 預設為當天日期
      }
});

return Account;
};
