'use strict';
//用於 Sequelize 模型的自動載入（autoloading），通常放在 models 資料夾中的 index.js 文件中。它的主要作用是自動讀取該資料夾中的所有模型（.js 文件），並將它們導入到 Sequelize 中，以便在應用程式中統一管理。
const fs = require('fs');                           //讀讀取檔案系統
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);         //取得目前檔案（即 index.js）的名稱
const env = process.env.NODE_ENV || 'development';  //development對應配置文件 config/config.json
const config = require(__dirname + '/../config/config.json')[env];    //從配置文件 config/config.json 中讀取當前環境的資料庫設定
const db = {};


let sequelize;
//部屬到 heroku，資料庫使用 JAWSDB MYSQL
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL, {
    dialect: 'mysql',
    protocol: 'mysql',
    logging: console.log, 
  });
 
  //有 use_env_variable 就使用 env 中的資料庫連接資訊；反之從 config 直接讀取資料庫名稱、使用者名稱、密碼等，來初始化 Sequelize。
} else if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


// 初始化models資料夾所有模型檔案
fs.readdirSync(__dirname)   //讀取當前資料夾(models)的所有文件。
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  //將模型文件透過 sequelize.import() 載入到 Sequelize 中，並將載入的模型儲存在 db 物件中，以模型名稱為鍵
  // .forEach(file => {       
  //   const model = sequelize['import'](path.join(__dirname, file));  //最新版本的 Sequelize 不再支援 sequelize.import() 改用 require
  //   db[model.name] = model;
  // });
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

//遍歷所有載入的模型（Object.keys(db))，如果某個模型有定義 associate 函數，則呼叫它來設置模型之間的關聯（如 hasMany, belongsTo 等關聯
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//將 sequelize 和 Sequelize 兩個物件以及所有模型掛載到 db 物件上，並將這個 db 物件作為模組導出，讓其他文件可以引入使用
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;






// 優點：
// 自動加載：不需要手動去導入每個模型，.js 文件會自動被載入
// 支援模型關聯：模型若有關聯（associate），會自動處理不同模型間的關係
// 根據 NODE_ENV，切換不同的資料庫設定（如開發、測試、正式環境）
// 常見於使用 Sequelize 的專案，能夠有效簡化管理
