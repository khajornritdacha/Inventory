const express = require("express");
const app = express();
app.set("view engine", "ejs");


class Items {
    constructor (_name, _loc) {
        this.name = _name;
        this.loc = _loc;
    }
}


app.get("/", (req, res) => {
    let data = [];
    data.push(new Items("Key", "Room1"));
    data.push(new Items("Tissue", "RoomX"));
    data.push(new Items("Soap", "Toilet"));
    data.push(new Items("Shampoo", "Toilet"));
    res.render("index", {items: data})
});    


app.listen(3000, () => {console.log("Server is running at port 3000");});


