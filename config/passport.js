const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");


const User = require("../models/User");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({
            usernameField: "email",
        },
        (email, password, done) => {
            // Match User
            User.findOne({email: email})
             .then((user) => {
                if(!user) {
                    return done(null, false, {message: "That email is not registered."})
                } 

                // Compare password
                if (password === user.password) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: "Password is incorrect."})
                }
             })
             .catch(err => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}