const express = require('express');
const cors = require('cors');
const routers = require('./BackEnd/src/routers'); 

const app = express();

app.use(express.json());
app.use(cors()); //biblioteca necessaria apra se comunicar com a web
app.use(routers); 

    app.listen(8081, function(){
        console.log("Servidor excutando na url: http://localhost:8081")
    });

