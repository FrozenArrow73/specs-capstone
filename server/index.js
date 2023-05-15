require("dotenv").config()
const express = require("express")
const cors = require("cors")

const{SERVER_PORT} = process.env
const {sequelize} = require("./util/database")

const {User} = require('./models/user')
const {PublicBook} = require("./models/publicBook")
const {UserBook} = require("./models/userBook")
const {Sentence} = require("./models/sentence")
const {SentenceGrade} = require("./models/sentenceGrades")


User.hasMany(UserBook)
UserBook.belongsTo(User)
PublicBook.hasMany(UserBook)
UserBook.belongsTo(PublicBook)
PublicBook.hasMany(Sentence)
Sentence.belongsTo(PublicBook)
Sentence.hasMany(SentenceGrade)
SentenceGrade.belongsTo(Sentence)
User.hasMany(SentenceGrade)
SentenceGrade.belongsTo(User)





const app = express()
app.use(express.json())
app.use(cors())



sequelize.sync().then(() => {
    app.listen(SERVER_PORT, () => {
        console.log("running on port " + SERVER_PORT)
    })
}). catch((err) => {
    console.error(err)
})
