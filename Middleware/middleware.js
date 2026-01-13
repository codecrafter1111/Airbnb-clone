const {listingSchema} = require("../Schema/schema")
const {reviewSchema} = require("../Schema/schema")
const ExpressError = require("../utils/ExpressError")
const Listing = require("../Model/listing")
const Review = require("../Model/review")


// Middleware to check the User is LoggedIn or Not
module.exports.isLoggedIn = (req,res,next)=>{
     console.log(req.user) 
     if(!req.isAuthenticated()){ // checking the Use is login or not
        req.session.redirectUrl = req.originalUrl; // storing the original url to the seeeion redirectUrl
        req.flash("error","you must be login, before creating the New listings")
        return res.redirect("/login")
    }else{
        next()
    }
}

// storing the original path url to the "res.locals" 
module.exports.saveRedeirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next()
}

// making the server side validate Middleware for listings
module.exports.validatelisting = (req, res, next) => {
    let {error} = listingSchema.validate(req.body)
    if (error) {
        let errmsg = error.details.map((el)=> el.message).join(",") // extracting the all error which are presen in the detail
        throw new ExpressError(400, errmsg) // this error is throw by the Joi from the serve side
    }else{
        next()
    }
}


// making the server side validate Middleware for review
module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body)
    if (error) {
        let errmsg = error.details.map((el)=> el.message).join(",") // extracting the all error which are presen in the detail
        throw new ExpressError(400, errmsg) // this error is throw by the Joi from the serve side
    }else{
        next()
    }
}


// Applying the AUtherization for listing
module.exports.isOwner= async (req,res,next)=>{
    let { id } = req.params
    const listing = await Listing.findById(id)
    if(!listing.owner.equals(res.locals.currUser._id)){ 
        req.flash("error","you are not the Owner of this listing")
        return res.redirect(`/listings/${id}`)
    }
    next()
}

// Applying the AUtherization for Review
module.exports.isAuthor= async (req,res,next)=>{
    let {id, reviewId } = req.params
    const review = await Review.findById(reviewId)
    if(!review.author.equals(res.locals.currUser._id)){ 
        req.flash("error","you are not the Author of this Review")
        return res.redirect(`/listings/${id}`)
    }
    next()
}