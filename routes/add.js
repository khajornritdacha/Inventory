const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("add"); 
});

router.post("/", (req, res) => {
    console.log(req.body);
    const _name = req.body["item-name"];
    const _loc = req.body["loc"];
    res.redirect("/");
});

module.exports = router;