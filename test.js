const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('acctest-db-d', 'blinky', 'x(e=e1p2([xLE8B6%-HY', {
  host: 'boxboat-demo-sql.database.windows.net',
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