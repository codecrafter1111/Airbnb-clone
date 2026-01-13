const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync")
const passport = require("passport")
const {saveRedeirectUrl} = require("../Middleware/middleware")
const {signupUser,handleSignUp,userLogin,handleLogin,handleLogOut} = require("../Controllers/user")

// SignUp User route GET & POST
router
.route("/signup")
.get( wrapAsync(signupUser))
.post( wrapAsync(handleSignUp))

// Login User route GET & POST
router
.route("/login")
.get( wrapAsync(userLogin))
.post( 
    saveRedeirectUrl,
    passport.authenticate("local", {  // passing the middleware to check the suthentication by passport
        failureRedirect: "/login", 
        failureFlash: true 
    }), 
    wrapAsync(handleLogin)
)

// User LogOut Route
router.get("/logout",handleLogOut)



module.exports = router