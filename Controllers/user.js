const User = require("../Model/user")



// SignUp route 
module.exports.signupUser = async (req, res) => {
    res.render("user/signup.ejs")
}

// Handle signup POST
module.exports.handleSignUp = async (req, res) => {
    try {
        const { username, email, password, } = req.body;
        const newUser = new User({ email, username })
        const registerUser = await User.register(newUser, password)
        console.log(registerUser)
        req.login(registerUser, (err) => {
            if (err) {
                return next(err)
            } else {
                // Redirect to listings or show success message
                req.flash("success", `Welcome to Airbnb ${newUser.username}! Your account has been created successfully.`);
                res.redirect("/listings");
            }
        })
    } catch (err) {
        req.flash("error", err.message)
        res.redirect("/signup")
    }
}

// Login route
module.exports.userLogin = async (req, res) => {
    res.render("user/login.ejs")
}

// Handle login POST
module.exports.handleLogin = async (req, res) => {
        req.flash("success", `Welcome back to Airbnb, ${req.user.username}!`);
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    }

// User LogOut Route
module.exports.handleLogOut = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
           return next(err)
        }
        req.flash("success","you are logout now")
        res.redirect("/listings")
    })
}