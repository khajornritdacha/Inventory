// TODO: create module for Items class
// TODO: make route for add (if necessary)

const express = require("express");
const dataStore = require("nedb");

const app = express();
const database = new dataStore("database.db");
database.loadDatabase();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


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
        res.render("index", {titleName: "Inventory", items: data})
    });
});    

// const addRouter = require("./routes/add");
// app.use("/add", addRouter);

app.get("/add", (req, res) => {
    res.render("add", {titleName: "Add New Item"}); 
});

app.post("/add", (req, res) => {
    console.log(req.body);
    const _name = req.body["item-name"];
    const _loc = req.body["loc"];
    database.insert(new Items(_name, _loc));
    res.redirect("/");
});


app.listen(3000, () => {console.log("Server is running at port 3000");});


