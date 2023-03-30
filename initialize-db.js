const { Sequelize } = require('sequelize');
const { dbName, dbConfig } = require('./config.json');

module.exports = async function initialize() {
    const dialect = 'mssql';
    const host = dbConfig.server;
    const { userName, password } = dbConfig.authentication.options;

    // connect to db
    let sequelize;
    try {
        sequelize = new Sequelize(dbName, userName, password, { host, dialect });
        await sequelize.authenticate()
    } catch (e) {
        sequelize = new Sequelize('sqlite::memory:')
    }

    require('./db-models.js')(sequelize);
    sequelize.sync({ alter: true })

    return sequelize
}
