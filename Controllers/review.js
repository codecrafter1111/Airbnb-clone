const Review = require("../Model/review")
const ExpressError = require("../utils/ExpressError")
const Listing = require("../Model/listing")



//Create Review 
module.exports.createReveiw = async (req,res) =>{
    let {id} = req.params
    let listing = await Listing.findById(id)
    
    if(!listing){
        throw new ExpressError(404, "Listing not found")
    }
    
    let newReview = new Review(req.body.review)
    newReview.author = req.user._id
    console.log(newReview)
    await newReview.save()
    
    listing.review.push(newReview._id)
    await listing.save()
    req.flash("success" , "New Review Created!")
    res.redirect(`/listings/${id}`)
}


// Review Delete route 
module.exports.deleteReview = async(req,res)=>{
    let {id,reviewId} = req.params
    await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}})// deleting the review also from the existing array which are stored in the listing array
    await Review.findByIdAndDelete(reviewId)
    req.flash("success" , "Review Deleted!")
    res.redirect(`/listings/${id}`)
    
}
