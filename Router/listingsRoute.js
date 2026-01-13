const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync")
const { isLoggedIn, isOwner, validatelisting } = require("../Middleware/middleware")
const { listing, newListing, showListing, createListing, editListing, updateListing, deleteListing } = require("../Controllers/listing")

const {storage} = require("../cloudeConfig")
const multer  = require('multer')
const upload = multer({storage})


// Index route & Create Route
router
    .route("/")
    .get(wrapAsync(listing))
    .post(
        isLoggedIn, 
        upload.single("listing[image]"), 
        validatelisting,
        wrapAsync(createListing))



//New route 
router.get("/new", isLoggedIn, wrapAsync(newListing))


// Show Route , Update Route & Delete Route
router
.route("/:id")
.get(wrapAsync(showListing))
.put(isLoggedIn, isOwner, upload.single("listing[image]"), validatelisting, wrapAsync(updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(deleteListing))


//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(editListing))


module.exports = router