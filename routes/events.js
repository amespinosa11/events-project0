const express = require("express");
const router  = express.Router();

router.get("/", (req, res) => {
    let events = [
        {id:1,nombre:'Primer evento', categoria:'Uno', lugar:'Casa',direccion:'Calle 1', fechaInicio:'2020-01-10',fechaFin:'2020-01-19',presencial:true, fechaCreacion:'2020-01-01'},
        {id:1,nombre:'Primer evento', categoria:'Uno', lugar:'Casa',direccion:'Calle 1', fechaInicio:'2020-01-10',fechaFin:'2020-01-19',presencial:true, fechaCreacion:'2020-01-01'},
        {id:1,nombre:'Primer evento', categoria:'Uno', lugar:'Casa',direccion:'Calle 1', fechaInicio:'2020-01-10',fechaFin:'2020-01-19',presencial:true, fechaCreacion:'2020-01-01'}
    ]
    res.render("events/events",{events:events});
});

router.get("/new", (req,res) => {
    res.render("events/new");
});

router.get("/detail", (req,res) => {
    const event = {id:1,nombre:'Primer evento', categoria:'Uno', lugar:'Casa',direccion:'Calle 1', fechaInicio:'2020-01-10',fechaFin:'2020-01-19',presencial:true, fechaCreacion:'2020-01-01'};
    res.render("events/detail",{event:event});
});

module.exports = router;