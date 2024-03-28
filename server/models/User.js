const {DataTypes} = require('sequelize');
const sequelize = require("./connect")

const User = sequelize.define('User', {
    name:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING,
        unique:true
    },
    phone:{
        type:DataTypes.STRING,
        unique:true
    },
    password:{
        type:DataTypes.STRING
    },
    role:{
        type:DataTypes.ENUM,
        values:['tenant','admin','manager'],
        defaultValue:'tenant'
    },
});

module.exports = User

