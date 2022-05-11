const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");


const User = require("../models/User");

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        let user = await User.findOne({email: email});
        if (!user) {
            return done(null, false, {message: "That email is not registered."});
        }

        try {
            if (password === user.password) {
                return done(null, user);
            } else {
                return done(null, false, {message: "Password incorrect."});
            }
        } catch (e) { 
            console.log(e);
            done(e);
        }
    }


    passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}

module.exports = initialize;
