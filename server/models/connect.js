const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('jemi', 'leo', 'leo', {
    host: 'localhost',
    dialect:'mysql'
})

const testConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log("connected")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = sequelize