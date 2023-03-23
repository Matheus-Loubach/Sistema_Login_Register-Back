const mongoose = require("mongoose")
const uri = process.env.MONGODB_URI;

async function main(){

    try {
         mongoose.set("strictQuery", true)
        
          await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Banco Conectado", mongoose.connection.host);
    } catch (error) {
        console.log(`error: ${error}`);
    }
}


module.exports = main