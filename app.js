const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


class Items {
    constructor (_name, _loc) {
        this.name = _name;
        this.loc = _loc;
    }
}

let data = [];
data.push(new Items("Key", "Room1"));
data.push(new Items("Tissue", "RoomX"));
data.push(new Items("Soap", "Toilet"));
data.push(new Items("Shampoo", "Toilet"));

app.get("/", (req, res) => {
    res.render("index", {items: data})
});    

app.get("/add", (req, res) => {
    res.render("add"); 
});

app.post("/add", (req, res) => {
    console.log(req.body);
    res.send("Complete");
});


app.listen(3000, () => {console.log("Server is running at port 3000");});


