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
    if(req.cookies.user) {
        res.redirect('/events');
    } else { 
        const user = {email: req.body.email, contrasena: req.body.contrasena};
        try {
            const newUser = await usersModel.createUser(user);
            if( newUser.rowCount === 1 ) {
                const auth = await usersModel.getUser(user.email, user.contrasena);
                res.cookie('user', auth[0]);
                res.redirect('/events');
            }
        } catch (error) {
            console.log(error);
        }
    }
});

router.get("/logout", function(req, res){
    res.clearCookie("user");
    console.log('Log out');
    res.redirect('/');
});

module.exports = router;