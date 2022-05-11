const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");
const auth = require("../config/auth");

// Login page
router.get("/login", auth.checkNotAuthenticated, (req, res) => {
    res.render("login");
});


// Login Handle
router.post("/login", auth.checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
}));


// Register Page
router.get("/register", auth.checkNotAuthenticated, (req, res) => {
    res.render("register");
});


router.post("/register", auth.checkNotAuthenticated, async (req, res) => {
    const { name, email, password, password2 } = req.body;
    // let errors = []; 

    // console.log({name, email, password, password2});
    try {
        // throw if password not match
        const newUser = new User({
            name,
            email,
            password,
        });
        await newUser.save()
        res.redirect("/users/login")      
    } catch (e) {
        console.log(e.message); 
        res.render("register", {
            errors: e.message,
            name,
            email,
            password,
            password2,
        });
    }

});

// Logout Handle
router.get("/logout", auth.checkAuthenticated, (req, res) => {
    req.logout();
    // req.flash("success_msg", "You are logged out");
    res.redirect("/");
})


module.exports = router;