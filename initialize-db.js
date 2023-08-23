const { Sequelize } = require('sequelize');

module.exports = async function initialize() {
    let sequelize;
    if (process.env.AZURE == 'true') {
        console.log('INITALIZING MSSQL')
        const dialect = 'mssql';
        const host = process.env.DB_SERVER;
        const dbName = process.env.DB_NAME;
        const userName = process.env.DB_USER;
        const password = process.env.DB_PASS;
        try {
            sequelize = new Sequelize(dbName, userName, password, { host, dialect });
            await sequelize.authenticate()
        } catch (e) {
            console.log('AUTHENTICATION ERROR')
            console.log(e)
            console.log('FALLING BACK TO SQLITE')
            sequelize = new Sequelize('sqlite::memory:')
        }
    } else {
        console.log('INITALIZING SQLITE') 
        sequelize = new Sequelize('sqlite::memory:')
    }

    require('./db-models.js')(sequelize);
    sequelize.sync({ alter: true })

    return sequelize
}
