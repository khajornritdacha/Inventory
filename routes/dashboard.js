const router = require("express").Router();
const auth = require("../config/auth");
const mongoose = require("mongoose");

const User = require("../models/User");
const Inventory = require("../models/Inventory");


// Dashboard
router.get("/", auth.checkAuthenticated, async (req, res) => {
    try {
        let popUser = await req.user.populate("invts", ["name"]);
        // console.log(popUser);
        res.render("dashboard", { user: popUser });        
    } catch (e) {
        console.log(e.message);
        res.redirect("/users/logout");
    }
});

// Need to ensure that user really owned this invt
// router.get("/invt/:id", auth.checkAuthenticated, async (req, res) => {
//     // console.log(req.params.id);
//     // res.send("Hello");
//     const id = req.params.id;
//     try {
//         let invt = await Inventory.findById(id);
//         console.log(invt);
//         res.render("inventory", { invt: invt.items });
//     } catch (e) {
//         console.log(e.message);
//         res.redirect("/dashboard");
//     }
// });


module.exports = router;
