const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const cookieparser = require("cookie-parser");
const session = require("express-session");
const flash=require('connect-flash');


app.use(session({
    cookie: {
        maxAge: 60000
    },
    secret: "abhishek230598",
    resave: false,
    saveUninitialized: false
}));
app.use(cookieparser());
app.use(express.urlencoded({
    extended: true
}))

app.set("view engine", "ejs");
app.set("views", "views");

app.use(flash());
const userAuth = require("./middlewares/userAuth");

app.use(userAuth.authJwt);

const userRoute = require("./routes/user");
app.use(userRoute);

const dbDriver = "mongodb+srv://Soumyadip:Panja21031998@cluster0.cf1ge.mongodb.net/jwtauthentication";

const port = process.env.PORT || 1992;
mongoose.connect(dbDriver, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    app.listen(port, () => {
        console.log("db is connected....");
        console.log(`server running at http://localhost:${port}`)
        console.log("server is running.......");
    })
}).catch(err => {
    console.log(err);
})