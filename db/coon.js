const mongoose = require("mongoose")

async function main(){

    try {
         mongoose.set("strictQuery", true)

        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.xbwyyzd.mongodb.net/?retryWrites=true&w=majority`);
        console.log("Banco Conectado", mongoose.connection.host);
    } catch (error) {
        console.log(`error: ${error}`);
    }
}


module.exports = main