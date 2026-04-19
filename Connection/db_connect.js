const mongoose = require("mongoose")


const connectDb = async ()=>{
   try{
      const mongoUri = process.env.MONGO_URI

      if(!mongoUri){
         throw new Error("MONGO_URI is not defined")
      }

      await mongoose.connect(mongoUri)
    console.log("Database is connected sucessfully")
   }catch(err){
    console.log("Connection to DB is error" , err)
    process.exit(1)
   }
}

module.exports = connectDb