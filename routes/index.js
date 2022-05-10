const router = require("express").Router();
const dataStore = require("nedb");
const { ensureAuthenticated } = require("../config/auth");

const database = new dataStore("database.db");
database.loadDatabase();


function readAllData () {
    return new Promise (resolve => {
        database.find({}, (err, docs) => {
            resolve(docs);
        });
    });
}

// Index page
router.get("/", (req, res) => {
    // readAllData().then((data) => {
    //     res.render("index", {items: data})
    // });
    res.render("index", {items: []});
});    


// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) => {
    res.render("dashboard", {
        user: req.user,
    });
});

module.exports = router;