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
                    }
                ]
            })
            const filteredPublicBooks = foundPublicBooks.filter((book) => {
                if (book.userBooks.length === 0) {
                    return true
                } else {
                    let returnValue = true
                    book.userBooks.forEach((userBook) => {
                        if(userBook.userId == userId) {
                            returnValue = false
                        }
                    })
                    return returnValue
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
    },
    getPersonalBooks: async (req, res) => {
        const userId = req.params.userId

        try {
            const foundPersonalBooks = await PublicBook.findAll({
                attributes: ["title", "id", "img_url", "language"],
                include: [
                    {
                        model: UserBook,
                        where: {
                            userId: {
                                [Op.eq]: userId
                            }
                        }
                    }
                ]
            })
            res.status(200).send(foundPersonalBooks)
        } catch (err) {
            console.log(err)
            res.status(400).send("Unable to load books")
        }
    },
    
    deletePersonalBook: async (req, res) => {
        try {
            const deletedBook = await UserBook.destroy(
                {where: {
                    publicBookId: req.params.bookId,
                    userId: req.params.userId 
                }
            })
            res.sendStatus(200)
        } catch (err) {
            console.log(err)
            res.status(400).send("unable to delete book")
        }
    }
}