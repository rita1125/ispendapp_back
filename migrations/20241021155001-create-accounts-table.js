'use strict';

//遷移（migration）歷史檔案，每個遷移檔案是一次資料庫變更，遷移目的是使所有開發環境和正式環境的資料庫結構一致
//up 和 down 方法，用於 執行 和 還原 變更
//若本機已有使用 SQLite建立的模型&資料，在Heroku部署後，需要運行遷移以應資料庫變更 : heroku run npx sequelize-cli db:migrate
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cost: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      // 這個不用建，因為 createdAt、 updatedAt欄位是 sequelize自動生成的
      // createdAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE,
      //   defaultValue: Sequelize.NOW,
      // },
      // updatedAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE,
      //   defaultValue: Sequelize.NOW,
      // },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Accounts');
  }
};