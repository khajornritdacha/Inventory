// TODO: register validation and password hashing
// TODO: Not allow user to login/register when they are already logged in.
// TODO: flash message
// TODO: create module for Items class
// TODO: add back to dashboard button
// TODO: edit/ delete items and inventories

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

// const expressLayouts = require("express-ejs-layouts");

const PORT = process.env.PORT || 3000;
const app = express();

require("./config/passport")(passport);

// DB
// const CONFIG = require("./config/keys");
// mongoose.connect(CONFIG.MongoURI, { useNewUrlParser: true})
//  .then( () => console.log("MongoDB connected");)
//  .catch( (e) => console.log(e);)
mongoose.connect("mongodb://localhost/testdb", console.log("connected"));


// Body Parser and Files
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


// EJS
// app.use(expressLayouts)
app.set("view engine", "ejs");


// Express Session
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));


// Passport Middle Ware
app.use(passport.initialize());
app.use(passport.session());

 
// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/add", require("./routes/add"));
app.use("/dashboard", require("./routes/dashboard"));

app.listen(PORT, () => {console.log(`Server is running at port ${PORT}`);});


