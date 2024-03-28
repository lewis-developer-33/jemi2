const {DataTypes} = require('sequelize');
const sequelize = require("./connect")

const Maintenance = sequelize.define('Maintenance', {
    message:{
        type:DataTypes.STRING
    },
    date:{
        type:DataTypes.DATE,
    }
});

module.exports = Maintenance

