const {DataTypes} = require('sequelize');
const sequelize = require("./connect")

const Payment = sequelize.define('Payment', {
    amount:{
        type:DataTypes.STRING
    },
    date:{
        type:DataTypes.DATE
    },
});

module.exports = Payment

