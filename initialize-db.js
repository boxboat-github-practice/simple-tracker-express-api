const { Sequelize } = require('sequelize');

module.exports = async function initialize() {
    let sequelize;
    if (process.env.AZURE == 'true') {
        const dialect = 'mssql';
        const host = process.env.DB_SERVER;
        const { userName, password } = dbConfig.authentication.options;
        const { dbName, dbConfig } = require('./config.json');
        try {
            sequelize = new Sequelize(dbName, userName, password, { host, dialect });
            await sequelize.authenticate()
        } catch (e) {
            sequelize = new Sequelize('sqlite::memory:')
        }
    } else {
        sequelize = new Sequelize('sqlite::memory:')
    }

    require('./db-models.js')(sequelize);
    sequelize.sync({ alter: true })

    return sequelize
}
