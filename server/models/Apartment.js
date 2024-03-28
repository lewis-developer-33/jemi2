const {DataTypes} = require('sequelize');
const sequelize = require("./connect")

const Apartment = sequelize.define('Apartment', {
    title:{
        type:DataTypes.STRING,
        unique:true
    },
    description:{
        type:DataTypes.STRING,
    },
    type:{
        type:DataTypes.ENUM,
        values:['bedsitter',"one-bedroom","two-bedroom"]
    },
    price:{
        type:DataTypes.STRING
    }
});

module.exports = Apartment

