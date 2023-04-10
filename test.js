const { Sequelize } = require('sequelize');
const host = process.env.DB_SERVER;
const dbName = process.env.DB_NAME;
const userName = process.env.DB_USER;
const password = process.env.DB_PASS;

const sequelize = new Sequelize(dbName, userName, password, {
  host: host,
  dialect: 'mssql',
  driver: 'tedious',
  port: 1433
});

;(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      await sequelize.close()
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
})();