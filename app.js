// TODO: register validation and password hashing
// TODO: flash message
// TODO: add back to dashboard button
// TODO: edit/ delete items and inventories

if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
// const expressLayouts = require("express-ejs-layouts");

const PORT = process.env.PORT || 3000;
const app = express();

const initializePassport = require("./config/passport-config");
initializePassport(passport);

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

// Express flash
app.use(flash());

// Express Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));


// Passport Middle Ware
app.use(passport.initialize());
app.use(passport.session());

 
// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/add", require("./routes/add"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/invt", require("./routes/invt"));

app.listen(PORT, () => {console.log(`Server is running at port ${PORT}`);});


