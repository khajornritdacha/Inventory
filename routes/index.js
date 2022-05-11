const router = require("express").Router();

// Index page
router.get("/", (req, res) => {
    res.render("index", {items: []});
});    




module.exports = router;