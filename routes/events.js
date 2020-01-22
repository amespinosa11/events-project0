const express = require("express");
const router  = express.Router();
const eventsModel = require('../models/events');

router.get("/", async (req, res) => {
    if(req.cookies.user) {
        const events = await eventsModel.getEvents(req.cookies.user.id);
        res.render("events/events",{events:events});
    } else {
        res.redirect("/");
    }
    /*let events = [
        {id:1,nombre:'Primer evento', categoria:'Uno', lugar:'Casa',direccion:'Calle 1', fechaInicio:'2020-01-10',fechaFin:'2020-01-19',presencial:true, fechaCreacion:'2020-01-01'},
        {id:1,nombre:'Primer evento', categoria:'Uno', lugar:'Casa',direccion:'Calle 1', fechaInicio:'2020-01-10',fechaFin:'2020-01-19',presencial:true, fechaCreacion:'2020-01-01'},
        {id:1,nombre:'Primer evento', categoria:'Uno', lugar:'Casa',direccion:'Calle 1', fechaInicio:'2020-01-10',fechaFin:'2020-01-19',presencial:true, fechaCreacion:'2020-01-01'}
    ]*/
});

router.get("/new", (req,res) => {
    res.render("events/new");
});

router.get("/detail", (req,res) => {
    const event = {id:1,nombre:'Primer evento', categoria:'Uno', lugar:'Casa',direccion:'Calle 1', fechaInicio:'2020-01-10',fechaFin:'2020-01-19',presencial:true, fechaCreacion:'2020-01-01'};
    res.render("events/detail",{event:event});
});

module.exports = router;