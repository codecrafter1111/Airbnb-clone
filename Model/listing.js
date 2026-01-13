const mongoose = require("mongoose")
const Review = require("./review")
const User = require("./user")

 
const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image:{
        url:String,
        filename:String
    },
    price:{
        type:Number,
        required:true,
        min:[0, "Price must be a positive number"]
    },
    location:{
        type:String,
    },
    country:{
        type:String,
        
    },
    review:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    day:{
        type:String,
        required:true
    },
})

listingSchema.post("findByIdAndDelete", async(listing)=>{
    if(listing){
    await Review.deleteMany({_id: { $in: listing.review}})
    }
})

const listing = mongoose.model("listing",listingSchema)

module.exports = listing
