const express = require('express')
const app = express()

//Rota
    //Method HTTP - CRUD (CREATE,READ,UPDATE,DELETE)
        //Get - pega uma info
        //Post - Cria uma info
        //Put - altera toda a info
        //Path - altera parte da info
        //Delete - apaga uma info
    //Name - Um identificador da rota

    //Function(Callback) - Resposnsavel por executar algum comando

app.get('/soma',(req,res) => {
    const soma = 100 + 1

    res.json({soma: soma})
})

app.listen(3000)