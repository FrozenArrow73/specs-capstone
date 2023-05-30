const {Sentence} = require("../models/sentence")

module.exports = {
    seedBookThree: (req, res) => {
        Sentence.bulkCreate([
            {
                publicBookId: 3,
                value: "¡Es cierto!"
            },
            {
                publicBookId: 3,
                value: "Siempre he sido nervioso, muy nervioso, terriblemente nervioso."
            },
            {
                publicBookId: 3,
                value: "¿Pero por qué afirman ustedes que estoy loco?"
            },
            {
                publicBookId: 3,
                value: "loco? La enfermedad había agudizado mis sentidos, en vez de destruirlos o embotarlos."
            },
            {
                publicBookId: 3,
                value: "Y mi oído era el más agudo de todos."
            },
            {
                publicBookId: 3,
                value: "Oía todo lo que puede oírse en la tierra y en el cielo."
            },
            {
                publicBookId: 3,
                value: "Muchas cosas oí en el infierno."
            },
            {
                publicBookId: 3,
                value: "¿Cómo puedo estar loco, entonces?"
            },
            {
                publicBookId: 3,
                value: "Escuchen… y observen con cuánta cordura, con cuánta tranquilidad les cuento mi historia."
            },
            {
                publicBookId: 3,
                value: "Me es imposible decir cómo aquella idea me entró en la cabeza por primera vez; pero, una vez concebida, me acosó noche y día."
            },
            {
                publicBookId: 3,
                value: "Yo no perseguía ningún propósito."
            },
            {
                publicBookId: 3,
                value: "Ni tampoco estaba colérico."
            },
            {
                publicBookId: 3,
                value: "Quería mucho al viejo."
            },
            {
                publicBookId: 3,
                value: "Jamás me había hecho nada malo."
            },
            {
                publicBookId: 3,
                value: "Jamás me insultó."
            },
            {
                publicBookId: 3,
                value: "Su dinero no me interesaba."
            },
            {
                publicBookId: 3,
                value: "Me parece que fue su ojo."
            },
            {
                publicBookId: 3,
                value: "¡Sí, eso fue!"
            },
            {
                publicBookId: 3,
                value: "Tenía un ojo semejante al de un buitre… Un ojo celeste, y velado por una tela."
            },
            {
                publicBookId: 3,
                value: "Cada vez que lo clavaba en mí se me helaba la sangre."
            },
            
        ]).then((dbRes)=>{
            res.status(200).send("Book three was successfully added")
        }).catch((err) => {
            console.log(err)
            res.status(400).send("Book three failed to be added")
        })
    }
}