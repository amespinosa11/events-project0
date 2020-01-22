const express = require("express");
const router  = express.Router();
const usersModel = require('../models/user');

router.get("/", async function(req, res){
    if(req.cookies.user) {
        res.redirect('/events');
    } else {
        res.render("login");
    }
});

router.post("/", async function(req, res){
    const user = {email: req.body.email, contrasena: req.body.contrasena};
    const auth = await usersModel.getUser(user.email, user.contrasena);
    console.log(auth);
    if( auth.length > 0 ) {
        res.cookie('user', auth[0]);
        res.redirect('/events');
    }
});

router.get("/register", function(req, res){
    if(req.cookies.user) {
        res.redirect('/events');
    } else {
        res.render("register"); 
    }
});

router.post("/register", async function(req, res){
    const user = {email: req.body.email, contrasena: req.body.contrasena};
    try {
        const newUser = await usersModel.createUser(user);
        console.log(newUser);
        if( newUser.rowCount === 1 ) {
            const auth = await usersModel.getUser(user.email, user.contrasena);
            res.cookie('user', auth[0]);
            res.redirect('/events');
        }
    } catch (error) {
        console.log(error);
    }
});

router.get("/logout", function(req, res){
    res.cookie('user', undefined);
    console.log('Log out');
});

module.exports = router;