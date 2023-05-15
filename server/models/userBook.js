const {DataTypes} = require("sequelize")
const {sequelize} = require("../util/database")

module.exports = {
    UserBook: sequelize.define("userBook", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
    })
}