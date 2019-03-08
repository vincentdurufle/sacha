const mongoose = require('mongoose');
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passeportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const userSchema = new Schema({
    username: String,
    password: String
})

const User = mongoose.model('User', userSchema);

exports.loginForm = (req, res) => {
    res.render('login');
}


exports.login = passport.authenticate('local', {
    failureRedirect: '/users',
    successRedirect: '/users/add'

})


exports.registerForm = (req, res) => {
    res.render('register');
}


exports.register = async (req, res, next) => {
    const user = await new User({
        username: req.body.username,
        password: req.body.password
    });
    next();    
}

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
        return
    }
    res.redirect('/users');
}

