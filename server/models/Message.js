const {DataTypes} = require('sequelize');
const sequelize = require("./connect")

const Message = sequelize.define('Message', {
    body:{
        type:DataTypes.STRING
    },
    date:{
        type:DataTypes.STRING,
        unique:true
    }
});

module.exports = Message

