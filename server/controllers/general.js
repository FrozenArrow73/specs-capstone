const {PublicBook} = require("../models/publicBook")
const {UserBook} = require("../models/userBook")
const {Sentence} = require("../models/sentence")
const {SentenceGrade} = require("../models/sentenceGrades")
const {Op} = require("sequelize")
const axios = require("axios")
const {sequelize} = require("../util/database")
const sentence = require("../models/sentence")
require("dotenv").config()
const {API_KEY} = process.env

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
    },
    getRandomSentence: async (req, res) => {
        const userId = req.params.userId
        try {
            const foundSentence = await Sentence.findAll({
                order: sequelize.random(),
                limit: 1,
                attributes: ["value", "id"],
                include: [
                    {
                        model: PublicBook,
                        required: true,
                        include: [
                            {
                                model: UserBook,
                                required: true,
                                where: {
                                    userId: userId
                                }
                            }
                        ]
                    }
                ]
            })



            const encodedParams = new URLSearchParams();
            encodedParams.set('source_language', foundSentence[0].publicBook.language);
            encodedParams.set('target_language', 'en');
            encodedParams.set('text', foundSentence[0].value);

            const options = {
            method: 'POST',
            url: 'https://text-translator2.p.rapidapi.com/translate',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
            },
            data: encodedParams,
            };

            const response = await axios.request(options);

            const responseBody = {
                targetLanguageSentence: foundSentence[0].value,
                englishSentence: response.data.data.translatedText,
                sentenceId: foundSentence[0].id
            }

            //!dummy data so I dont accidentially overuse the API
            // const responseBody = {
            //     targetLanguageSentence: "Hola, cómo estás.",
            //     englishSentence: "Hi, how are you.",
            //     sentenceId: 1
            // }

            res.status(200).send(responseBody)
        } catch (err) {
            console.log(err)
            res.status(400).send("unable to get sentence")
        }
        
        
    },
    updateSentence: async (req, res) => {
        const {pass, sentenceId, userId} = req.body
        try {
            const foundSentenceGrade = await SentenceGrade.findOne({
                where: {
                    userId: userId,
                    sentenceId: sentenceId
                }
            })
            if (foundSentenceGrade) {
                foundSentenceGrade.pass = pass
                foundSentenceGrade.save()
                res.sendStatus(200)
            } else {
                const createdSentenceGrade = await SentenceGrade.create({
                    userId: userId,
                    sentenceId: sentenceId,
                    pass: pass
                })
                res.sendStatus(200)
            }
        } catch (err) {
            console.log(err)
            res.status(400).send("unable to update sentenceGrade")
        }
    },

    getMistakeSentence: async (req, res) => {
        const userId = req.params.userId
        try {


            const foundSentence = await Sentence.findAll({
                order: sequelize.random(),
                limit: 1,
                attributes: ["value", "id"],
                include: [
                    {
                        model: PublicBook,
                        include: [
                            {
                                model: UserBook,
                                where: {
                                    userId: userId
                                }
                            }
                        ]
                    },
                    {
                        model: SentenceGrade,
                        where: {
                            userId: userId,
                            pass: false
                        }
                    }
                ]
            })

            const encodedParams = new URLSearchParams();
            encodedParams.set('source_language', foundSentence[0].publicBook.language);
            encodedParams.set('target_language', 'en');
            encodedParams.set('text', foundSentence[0].value);

            const options = {
            method: 'POST',
            url: 'https://text-translator2.p.rapidapi.com/translate',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
            },
            data: encodedParams,
            };

            const response = await axios.request(options);

            const responseBody = {
                targetLanguageSentence: foundSentence[0].value,
                englishSentence: response.data.data.translatedText,
                sentenceId: foundSentence[0].id
            }
            res.status(200).send(responseBody)

        } catch(err){
            console.log(err)
            res.status(400).send("unable to get sentence")
        }
    }
}