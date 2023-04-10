const { Sequelize } = require('sequelize');

module.exports = async function initialize() {
    let sequelize;
    if (process.env.AZURE == 'true') {
        const dialect = 'mssql';
        const host = process.env.DB_SERVER;
        const dbName = process.env.DB_NAME;
        const userName = process.env.DB_USER;
        const password = process.env.DB_PASS;
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
