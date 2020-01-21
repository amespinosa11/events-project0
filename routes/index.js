const express = require("express");
const router  = express.Router();

router.get("/", function(req, res){
    res.render("login");
});

router.get("/register", function(req, res){
    res.render("register"); 
});

router.get("/logout", function(req, res){
    console.log('Log out');
});

module.exports = router;