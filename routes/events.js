const express = require("express");
const router  = express.Router();
const eventsModel = require('../models/events');
const categoriesModel = require('../models/category');

router.get("/", async (req, res) => {
    if(req.cookies.user) {
        let events = await eventsModel.getEvents(req.cookies.user.id);
        events = events.map( event => {
            event.fechacreacion = `${event.fechacreacion.getFullYear()}-${(event.fechacreacion.getMonth()+1) < 10 ? '0'+(event.fechacreacion.getMonth()+1) : (event.fechacreacion.getMonth()+1) }-${(event.fechacreacion.getDate()) < 10 ? '0'+(event.fechacreacion.getDate()) : event.fechacreacion.getDate()}`;
            return event;
        });
        res.render("events/events",{events:events});
    } else {
        res.redirect("/");
    }
});

router.get("/new", async(req,res) => {
    if(req.cookies.user) {
        const d = new Date();
        const minDate = `${d.getFullYear()}-${(d.getMonth()+1) < 10 ? '0'+(d.getMonth()+1) : (d.getMonth()+1) }-${(d.getDate()) < 10 ? '0'+(d.getDate()) : d.getDate()}`;
        const categories = await categoriesModel.getCategories();
        res.render("events/new", {categories:categories, minDate: minDate});
    } else {
        res.redirect("/");
    }
});

router.post("/new", async(req,res) => {
    if(req.cookies.user) {
        const presencial = req.body.presencial === 1 ? true :  false;
        const newEvent = {nombre:req.body.nombre, lugar: req.body.lugar, direccion: req.body.direccion, 
        fechainicio: new Date(req.body.fechainicio), fechafin: new Date(req.body.fechafin), presencial,
        fechacreacion: new Date(), iduser: req.cookies.user.id, idcategory: parseInt(req.body.categoria)};
        const createEvent = await eventsModel.createEvent(newEvent);
        if( createEvent.rowCount === 1 ) {
            res.redirect('/events');
        }
    } else {
        res.redirect("/");
    }
});

router.get("/:id", async(req,res) => {
    if(req.cookies.user) {
        const d = new Date();
        const minDate = `${d.getFullYear()}-${(d.getMonth()+1) < 10 ? '0'+(d.getMonth()+1) : (d.getMonth()+1) }-${(d.getDate()) < 10 ? '0'+(d.getDate()) : d.getDate()}`;
        let event = await eventsModel.getEvent(req.params.id);
        event = event[0];
        const categories = await categoriesModel.getCategories(); 
    
        event.fechainicio = `${event.fechainicio.getFullYear()}-${(event.fechainicio.getMonth()+1) < 10 ? '0'+(event.fechainicio.getMonth()+1) : (event.fechainicio.getMonth()+1) }-${(event.fechainicio.getDate()) < 10 ? '0'+(event.fechainicio.getDate()) : event.fechainicio.getDate()}`;
        event.fechafin = `${event.fechafin.getFullYear()}-${(event.fechafin.getMonth()+1) < 10 ? '0'+(event.fechafin.getMonth()+1) : (event.fechafin.getMonth()+1) }-${(event.fechafin.getDate()) < 10 ? '0'+(event.fechafin.getDate()) : event.fechafin.getDate()}`;
        event.fechacreacion = `${event.fechacreacion.getFullYear()}-${(event.fechacreacion.getMonth()+1) < 10 ? '0'+(event.fechacreacion.getMonth()+1) : (event.fechacreacion.getMonth()+1) }-${(event.fechacreacion.getDate()) < 10 ? '0'+(event.fechacreacion.getDate()) : event.fechacreacion.getDate()}`;
    
        res.render("events/detail",{event:event, categories: categories, minDate: minDate});
    } else {
        res.redirect("/");
    }
});

router.post("/:id", async(req,res) => {
    if(req.cookies.user) {
        const presencial = req.body.presencial === 1 ? true :  false;
        const newEvent = {nombre:req.body.nombre, lugar: req.body.lugar, direccion: req.body.direccion, 
        fechainicio: new Date(req.body.fechainicio), fechafin: new Date(req.body.fechafin), presencial, 
        iduser: req.cookies.user.id, idcategory: parseInt(req.body.categoria), id: req.params.id};
        const updateEvent = await eventsModel.editEvent(newEvent);
        if(updateEvent === 1) {
            res.redirect('/events');
        }
    } else {
        res.redirect("/");
    }
});

router.get("/delete/:id", async(req,res) => {
    if(req.cookies.user) {
        const deleteEvent = await eventsModel.deleteEvent(req.params.id);
        if(deleteEvent === 1) {
            res.redirect('/events');
        }
    } else {
        res.redirect("/");
    }
})

module.exports = router;