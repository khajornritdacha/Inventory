const express = require("express");
const router = express.Router();
const dataStore = require("nedb");

const database = new dataStore("database.db");
database.loadDatabase();

router.get("/", (req, res) => {
    res.render("add"); 
});

router.post("/", (req, res) => {
    console.log(req.body);
    const _name = req.body["item-name"];
    const _loc = req.body["loc"];
    database.insert(new Items(_name, _loc));
    res.redirect("/");
});

module.exports = router;