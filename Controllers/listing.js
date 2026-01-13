const Listing = require("../Model/listing")





// Index listing
module.exports.listing = async (req, res) => {
    let alllistings = await Listing.find({})
    res.render("listings/listing.ejs", { alllistings })
}

//New listing 
module.exports.newListing = async (req, res) => {
    res.render("listings/new.ejs")
}

// Show listing
module.exports.showListing = async (req, res) => {
    let { id } = req.params
    let listing = await Listing.findById(id)
        .populate({
            path: 'review',
            populate: {
                path: "author"
            }
        })
        .populate("owner")
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!")
        return res.redirect("/listings")
    }
    // console.log(listing)
    res.render("listings/show.ejs", { listing })
}

// Create listing
module.exports.createListing = async (req, res, next) => {
    const url = req.file.path;
    const filename = req.file.filename
    const newListing = new Listing(req.body.listing)
    newListing.owner = req.user._id
    newListing.image = { url, filename }
    await newListing.save()
    req.flash("success", "New Listing Created!")
    res.redirect("/listings")
}

// Edit listing
module.exports.editListing = async (req, res) => {
    let { id } = req.params
    let listing = await Listing.findById(id)
    if (!listing) {
        req.flash("error", "Listing you requested for Edit does not exist!")
        return res.redirect("/listings")
    }
    res.render("listings/edit.ejs", { listing })
}

// Update listing
module.exports.updateListing = async (req, res) => {
    let { id } = req.params
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true })

    if (typeof req.file !== "undefined") {
        const url = req.file.path;
        const filename = req.file.filename
        listing.image = { url, filename }
        await listing.save();
    }
    req.flash("success", " Listing Updated!")
    res.redirect(`/listings/${id}`)
}

// delete listing
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params
    let deleteItem = await Listing.findByIdAndDelete(id)
    req.flash("success", " Listing Deleted!")
    console.log(deleteItem)
    res.redirect("/listings")
}