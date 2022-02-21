const UserModel = require("../models/UserModel");

exports.verifyUser = (req, res, next) => {
    UserModel.findOne({
        userName: req.body.username
    }).exec((err, user) => {
        if (err) {
            console.log(err, "Error while find username in middleware");
            return res.redirect('/registration');
        }
        if (user) {
            console.log("Username already exists");
            req.flash('message', 'Username already exists');
            req.flash('alert','alert-danger');
            return res.redirect('/registration');
        }
        const password = req.body.password;
        const confirm = req.body.confirmpassword;
        if (password !== confirm) {
            console.log("password and confirm password doesn't match");
            req.flash('message', 'password and confirm password doesnot match');
            req.flash('alert','alert-danger');
            return res.redirect('/registration')
        }
        next();
    })
}