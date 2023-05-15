const {DataTypes} = require('sequelize')

const {sequelize} = require("../util/database")

module.exports = {
    PublicBook: sequelize.define('publicBook', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        img_url: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        language: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    })
}