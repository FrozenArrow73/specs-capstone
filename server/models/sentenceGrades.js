const {DataTypes} = require("sequelize")
const {sequelize} = require("../util/database")

module.exports = {
    SentenceGrade: sequelize.define("sentenceGrade", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        pass: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
}