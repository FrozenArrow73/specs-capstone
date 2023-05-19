const {PublicBook} = require("../models/publicBook")
const {UserBook} = require("../models/userBook")
const {Op} = require("sequelize")
module.exports = {
    getPublicBooks: async (req, res) => {
        const userId = req.params.userId
        

        try {
            const foundPublicBooks = await PublicBook.findAll({
                attributes: ["title", "id", "img_url", "language"],
                include: [
                    {
                        model: UserBook,
                        // where: {
                        //     userId: {
                        //         [Op.ne]: userId
                        //     }
                        // }
                    }
                ]
            })
            const filteredPublicBooks = foundPublicBooks.filter((book) => {
                // console.log(book.userBooks[0].userId)
                if (book.userBooks.length === 0) {
                    return true
                } else if( book.userBooks[0].userId == userId){
                    return false
                } else {
                    return true
                }
            })
            res.status(200).send(filteredPublicBooks)
        } catch (err) {
            console.log(err)
            res.status(400).send("Unable to load books")
        }
        
        
        
    },
    addPersonalBook: (req, res) => {
        const {bookId, userId} = req.params

        try {
            const foundUserBook = UserBook.findOrCreate({ 
                where: {
                    userId: userId,
                    publicBookId: bookId
                }
            })
            res.sendStatus(200)
        } catch (err) {
            console.log(err)
            res.status(400).send("Unable to add books")
        }
    }
}