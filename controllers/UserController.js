const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.index = (req, res) => {
    res.render("index",{
        message:req.flash('message'),
        alert:req.flash('alert')
    })
}

exports.registration = (req, res) => {
    res.render("registration",{
        message:req.flash('message'),
        alert:req.flash('alert')
    })
}

exports.addUser = (req, res) => {
    UserModel({
        userName: req.body.username,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }).save().then(result => {
        console.log("User added....");
        req.flash('message','User Added Successfully')
        req.flash('alert','alert-success')
        res.redirect("registration")
    }).catch(err => {
        console.log(err, "error while add user");
    })
}

exports.login = (req, res) => {
    UserModel.findOne({
        userName: req.body.username
    }, (err, data) => {
        if (data) {
            if (data.status) {
                const hashPwd = data.password;
                if (bcrypt.compareSync(req.body.password, hashPwd)) {
                    const token = jwt.sign({
                        id: data._id,
                        username: data.userName,
                    }, "abhi123", { expiresIn: "3m" });
                    res.cookie("userToken", token);
                    res.redirect("dashboard");
                } else {
                    console.log("Password not matched..........");
                    req.flash('message','Password not matched..........');
                    req.flash('alert','alert-danger');
                    res.redirect("/");
                }
            } else {
                console.log("Status false...");
                req.flash('message','Status false...');
                 req.flash('alert','alert-danger');
                res.redirect("/");
            }
        } else {
            console.log("username not exist");
            req.flash('message','username not exist');
             req.flash('alert','alert-danger');
            res.redirect("/");
        }
    })
}

exports.dashboard = (req, res) => {
    res.render("dashboard", {
        data: req.user
    })
}

exports.userAuth = (req, res, next) => {
    if (req.user) {
        console.log(req.user);
        next();
    } else {
        console.log(req.user, "err");
        res.redirect("/")
    }
}

exports.logout = (req, res) => {
    res.clearCookie("userToken");
    res.redirect("/")
}