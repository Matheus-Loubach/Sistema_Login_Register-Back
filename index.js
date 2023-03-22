const express = require("express")
require("dotenv").config();
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())


//DB CONNECTION
const conn = require("../back/db/coon")
conn();

//Routers
const routes = require("./routes/router")
app.use('/Api', routes);

app.listen(3000, function(){
    console.log('Servidor Online porta 3000');
})

