const router = require("express").Router();
const { ensureAuthenticated } = require("../config/auth");
const mongoose = require("mongoose");

const User = require("../models/User");
const Inventory = require("../models/Inventory");
const { redirect } = require("express/lib/response");


async function populateInv(user) {
    let popUser = await user.populate("invts", ["name"]);
    return popUser;
}


// Dashboard
router.get("/", ensureAuthenticated, (req, res) => {
    try {
        populateInv(req.user)
        .then((popUser) => {
            console.log(popUser);
            res.render("dashboard", {
                user: popUser,                
            });
        });
        
    } catch (e) {
        console.log(e.message);
        res.redirect("/users/logout");
    }
});

// Need to ensure that user really owned this invt
router.get("/invt/:id", ensureAuthenticated, (req, res) => {
    // console.log(req.params.id);
    // res.send("Hello");
    const id = req.params.id;
    try {
        Inventory.findById(id)
        .then((invt) => {
            console.log(invt);
            res.render("inventory", {
                invt: invt.items
            });
        })
    } catch (e) {
        console.log(e.message);
        res.redirect("/dashboard");
    }
});






module.exports = router;