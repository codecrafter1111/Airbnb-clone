if(process.env.NODE_ENV != "production"){ // to protect the env file from deployment
    require('dotenv').config()
}

const express = require("express")
const app = express()
const PORT = 8082
const connectDb = require("./Connection/db_connect")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const ExpressError = require("./utils/ExpressError")
const listingsRouter = require("./Router/listingsRoute")
const reviewsRouter = require("./Router/reviewRoute")
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const  User = require("./Model/user")
const userRouter = require("./Router/userRoute")


//Connection to mongodb
connectDb()

// Middleware
app.set("views", path.join(__dirname, "Views"))
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.engine("ejs", ejsMate)
app.use(express.static(path.join(__dirname, "Public")))

// Express sessionOption
const sessionOption = {
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expire: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly:true
    }
}
//Passing the sessionOption to the Session
app.use(session(sessionOption))

// Using the Connect-Flash to flash the message as like Alert
app.use(flash())

// Initilixed the passport and passport.session as Middlware
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser()) // it store the infromation of the user
passport.deserializeUser(User.deserializeUser()) // it unstore the information of the user


// Home Route
// app.get("/", wrapAsync(async (req, res) => {
//     res.send("Home Page")
// }))

//Middleware to  show the mesage to the flash
app.use((req,res,next)=>{
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.currUser = req.user
    next()
})


//Listings Routes
app.use("/listings" ,listingsRouter)

//review Routes
app.use("/listings/:id/reviews" ,reviewsRouter)

// user route
app.use("/",userRouter)



// Making these route to test the middleware (if there is no any matching route this middleware is triggered)
app.use((req, res, next) => { // Catch-all route for unmatched paths
    next(new ExpressError(404, "Page Not Found!"))
})


// Error Handling Middleware
app.use((err, req, res, next) => {
    // if(err.name === "CastError"){
    //     err = new ExpressError(405,"Please Enter the valid Castvalue")
    // }
    // if(err.name === "ValidationError"){
    //     err = new ExpressError(405,"Please Enter the valid value")
    // }
    let { status = 402, message = "invalid value" } = err
    res.status(status).render("error.ejs", { message, status })
})


app.listen(PORT, (req, res) => {
    console.log(`server is listening at http://localhost:${PORT}`)
})