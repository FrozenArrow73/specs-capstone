const {User} = require("../models/user")
require("dotenv").config()
const {SECRET} = process.env
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const createToken = (username, id) => {
    return jwt.sign({
        username,
        id
    }, SECRET, {
        expiresIn: "2 days"
    })
}

module.exports = {
    register: async (req, res) => {
        console.log("i ran")
        try {
            const {username, password} = req.body
            const dbUser = await User.findOne({where: {username: username}})
            if (dbUser){
                res.status(400).send("Cannot create user")
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)
                const newUser = await User.create({username: username, password: hash})
                const token = createToken(newUser.dataValues.username, newUser.dataValues.id)
                const expiration = Date.now() + 1000 * 60 * 60 * 48
                res.status(200).send({
                    username: newUser.dataValues.username,
                    userId: newUser.dataValues.id,
                    token,
                    expiration
                })
            }

        } catch (err) {
            console.log("error in register")
            console.log(err)
            res.sendStatus(400)
        }
    },
    login: async (req, res) => {
        const {username, password} = req.body
        const dbUser = await User.findOne({where: {username: username}})
        if (dbUser) {
            const isAuthenticated = bcrypt.compareSync(password, dbUser.dataValues.password)
            if (isAuthenticated) {
                const token = createToken(dbUser.dataValues.username, dbUser.dataValues.id)
                const expiration = Date.now() + 1000 * 60 * 60 * 48
                res.status(200).send({
                    username: dbUser.dataValues.username,
                    userId: dbUser.dataValues.id,
                    token,
                    expiration
                })
            } else {
                res.status(400).send('Cannot log in')
            }
        } else {
            res.status(400).send('Cannot log in')
        }
    }
}