const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose").default

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    // username:String,  (passport-local-mongoose automaitcally define the username and password with hash and salting value)
    // password:Number,
})

userSchema.plugin(passportLocalMongoose)

// const User = mongoose.model("User" , userSchema)
// module.exports = User

// OR we can also directly export it without storing in a variable

module.exports = mongoose.model("User", userSchema)