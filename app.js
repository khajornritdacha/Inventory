const express = require("express");
const bodyParser = require("body-parser");
const dataStore = require("nedb");

const app = express();
const database = new dataStore("database.db");
database.loadDatabase();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


class Items {
    constructor (_name, _loc) {
        this.name = _name;
        this.loc = _loc;
    }
}


function readAllData () {
    return new Promise (resolve => {
        database.find({}, (err, docs) => {
            resolve(docs);
        });
    });
}


app.get("/", (req, res) => {
    readAllData().then((data) => {
        res.render("index", {items: data})
    });
});    

app.get("/add", (req, res) => {
    res.render("add"); 
});

app.post("/add", (req, res) => {
    console.log(req.body);
    const _name = req.body["item-name"];
    const _loc = req.body["loc"];
    database.insert(new Items(_name, _loc));
    res.send("Complete");
});


app.listen(3000, () => {console.log("Server is running at port 3000");});


