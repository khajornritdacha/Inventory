const router = require("express").Router();
const auth = require("../config/auth");
const mongoose = require("mongoose");

const User = require("../models/User");
const Inventory = require("../models/Inventory");


// Need to ensure that user really owned this invt
router.get("/:id", auth.checkAuthenticated, async (req, res) => {
    // console.log(req.params.id);
    const id = req.params.id;
    try {
        let invt = await Inventory.findById(id);
        // console.log(invt);
        res.render("inventory", { invt: invt });
    } catch (e) {
        console.log(e.message);
        res.redirect("/dashboard");
    }
});


// Add item to inventory
router.post("/:id", auth.checkAuthenticated, async (req, res) => {
    try {
        const {item_name, item_loc} = req.body;
        let invt = await Inventory.findById(req.params.id);
        invt.items.push({ item_name, item_loc});
        await invt.save();
        res.redirect("/invt/"+req.params.id);
    } catch (e) {
        console.log(e.message);
        res.redirect("/dashboard");
    }
});


// Add new Inventory
router.post("/", auth.checkAuthenticated, async (req, res) => {
    try {
        // Create new inv
        const name = req.body.inv_name;
        // console.log(name);
        console.log(req.user.id);
        const newInv = new Inventory({name});
        newInv.owners.push(req.user.id);
        await newInv.save();
        
        // Add new inv to owner
        const user = await User.findById(req.user.id);
        console.log(user);
        user.invts.push(newInv.id);
        await user.save();
    } catch (e) {
        console.log(e.message);
    }
    res.redirect("/dashboard")
});


// Rename Inventory
router.post("/update/:id", auth.checkAuthenticated, async (req, res) => {
    console.log(req.body);
    try {
        const newName = req.body.name;
        let invt = await Inventory.findById(req.params.id);
        invt.name = newName;
        await invt.save();
        res.redirect("/invt/"+req.params.id);
    } catch (e) {
        console.log(e.message);
        res.redirect("/dashboard");
    }
});


// Rename/ loc item Form
router.get("/edit_item/:inv_id/:idx", auth.checkAuthenticated, async (req, res) => {
    try {
        let invt = await Inventory.findById(req.params.inv_id);
        let idx = parseInt(req.params.idx);
        if (idx >= invt.items.length) {
            throw new Error("Idx out of bound")
        }
        res.render("edit_item", {invt, idx});
    } catch (e) {
        console.log(e.message);
        res.redirect("/dashboard");
    }
});


// Rename/ loc item
router.post("/edit_item/:inv_id/:idx", auth.checkAuthenticated, async (req, res) => {
    try {
        let invt = await Inventory.findById(req.params.inv_id);
        let idx = parseInt(req.params.idx);
        if (idx >= invt.items.length) {
            throw new Error("Idx out of bound")
        }
        
        const {item_name, item_loc} = req.body;

        invt.items[idx].item_name = item_name;
        invt.items[idx].item_loc = item_loc;

        await invt.save();

        res.redirect(`/invt/${req.params.inv_id}`);
    } catch (e) {
        console.log(e.message);
        res.redirect("/dashboard");
    }
});



module.exports = router;