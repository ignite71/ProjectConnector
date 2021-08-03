const mongoose = require('mongoose')

const {MONGOURI} = require('../config/Key')

const Database = async ()=>{
  
    try{
        const connection = await mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true})
        console.log("Database connected ")
    }
    catch(error){
        console.log(`Got a error:  ${error}`)
    }
    
    

}

module.exports = Database