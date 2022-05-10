const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");

// Login page
router.get("/login", (req, res) => {
    res.render("login");
});


// Login Handle
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/users/login",
        // failureFlash: true,
    })(req, res, next);
});


// Register Page
router.get("/register", (req, res) => {
    res.render("register");
});


router.post("/register", (req, res) => {
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
        newUser.save()
         .then(() => {
            res.redirect("/users/login")
         })
        
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
    // res.send("Completed");

});

// Logout Handle
router.get("/logout", (req, res) => {
    req.logout();
    // req.flash("success_msg", "You are logged out");
    res.redirect("/");
})


module.exports = router;