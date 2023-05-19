const {PublicBook} = require("../models/publicBook")
module.exports = {
    getPublicBooks: async (req, res) => {
        const userId = req.params.userId
        

        try {
            const foundPublicBooks = await PublicBook.findAll({
                attributes: ["title", "id", "img_url", "language"],
            })
            res.status(200).send(foundPublicBooks)
        } catch (err) {
            console.log(err)
            res.status(400).send("Unable to load books")
        }
        
        
        
    }
}