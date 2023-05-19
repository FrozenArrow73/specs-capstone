const {PublicBook} = require("../models/publicBook");

module.exports = {
    seedBooks: (req, res) => {

        PublicBook.bulkCreate([
            {title:"El gato negro", img_url:"https://covers.feedbooks.net/book/3231.jpg?size=large&t=1684469776", language:"es"},
            {title:"Los Crímenes de la calle Morgue", img_url:"https://covers.feedbooks.net/book/3215.jpg?size=large&t=1684473492", language:"es"},
            {title:"El corazón delator", img_url:"https://covers.feedbooks.net/book/3219.jpg?size=large&t=1684457645", language:"es"},
            {title:"Vingt-quatre heures de la vie d’une femme", img_url:"https://covers.feedbooks.net/book/6548.jpg?size=large&t=1684464971", language:"fr"},
            {title:"Das Urteil", img_url:"https://covers.feedbooks.net/book/6194.jpg?size=large&t=1684423063", language:"de"},

        ]).then((dbRes)=>{
            res.status(200).send("Books were successfully added")
        }).catch((err) => {
            console.log(err)
            res.status(400).send("Books failed to be added")
        })


        
    }
}