require("dotenv").config()
const {SECRET} = process.env
const jwt = require("jsonwebtoken")

module.exports = {
    authenticator: (req, res, next) => {
        const headerToken = req.get('authorization')

        if (!headerToken){
            res.status(400).send("Login required")
            return
        }
        
        let verifiedToken = false
        try {
            verifiedToken = jwt.verify(headerToken, SECRET)
        } catch {
            res.status(400).send("Login required")
            return
        }
        
        next()
    }
}