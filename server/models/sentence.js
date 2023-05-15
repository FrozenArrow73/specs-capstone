const {DataTypes} = require("sequelize")
const {sequelize} = require("../util/database")

module.exports = {
    Sentence: sequelize.define("sentence", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        value: {
            type: DataTypes.STRING(1000),
            allowNull: false
        }
    })
}