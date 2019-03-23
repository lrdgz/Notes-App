const express = require("express");
const router = express.Router();

const User = require('../models/User');

const passport = require('passport');

//RENDER FORM LOGIN
router.get('/signin', (req, res) => {
    res.render('users/signin');
});

//RENDER FORM SINGUP
router.get('/signup', (req, res) => {
    res.render('users/signup');
});

//RENDER FORM LOGIN
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

//RENDER FORM SINGUP
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


//REGISTER
router.post('/signup', async (req, res) => {
    const {name, email, password, confirm_password} = req.body;
    const errors = [];

    if (password != confirm_password){
        errors.push({text: "Password do not match"});
    }
    
    if (password.length < 4){
        errors.push({text: "Password must be at least 4 characters"});
    }

    if (errors.length > 0){
        res.render('users/signup', {errors, name, email, password, confirm_password});
    } else {
        const mailUser = await User.findOne({email: email});
        if (mailUser){
            req.flash('error_msg', 'The Email is already in use');
            res.redirect('/users/signup');
        }
        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You are registered');
        res.redirect('/users/signin');
    }
});


//ESPORT ROUTES
module.exports = router;