const express = require("express")
const router  = express.Router({mergeParams: true})
const wrapAsync = require("../utils/wrapAsync")
const Review = require("../Model/review")
const Listing = require("../Model/listing")
const {validateReview, isLoggedIn, isAuthor} = require("../Middleware/middleware")
const {createReveiw,deleteReview} = require("../Controllers/review")


//Create Review 
router.post("/", validateReview, isLoggedIn, wrapAsync(createReveiw))

// Review Delete route 
router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(deleteReview))


module.exports = router