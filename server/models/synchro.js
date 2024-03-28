const sequelize = require("./connect")

const User = require("./User")
const Apartment = require("./Apartment")
const Maintenance = require("./Maintenance")
const Message = require("./Message")
const Payment = require("./Payment")


User.hasOne(Apartment)
Apartment.belongsTo(User)

User.hasMany(Message)
Message.belongsTo(User)

Apartment.hasMany(Maintenance)
Maintenance.belongsTo(Apartment)

User.hasMany(Payment)
Payment.belongsTo(User)





const synchroModels = async () => {
    try {
        await sequelize.sync({force:true})
    } catch (error) {
        console.log(error.message)
    }
}

synchroModels()

