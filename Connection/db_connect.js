const mongoose = require("mongoose")


const connectDb = async ()=>{
   try{
    await mongoose.connect("mongodb://127.0.0.1:27017/AirBnb")
    console.log("Database is connected sucessfully")
   }catch(err){
    console.log("Connection to DB is error" , err)
    process.exit(1)
   }
}

module.exports = connectDb