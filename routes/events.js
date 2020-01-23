const express = require("express");
const router  = express.Router();
const eventsModel = require('../models/events');
const categoriesModel = require('../models/category');

router.get("/", async (req, res) => {
    if(req.cookies.user) {
        let events = await eventsModel.getEvents(req.cookies.user.id);
        events = events.map( event => {
            event.fechaCreacion = `${event.fechaCreacion.getFullYear()}-${(event.fechaCreacion.getMonth()+1) < 10 ? '0'+(event.fechaCreacion.getMonth()+1) : (event.fechaCreacion.getMonth()+1) }-${(event.fechaCreacion.getDate()) < 10 ? '0'+(event.fechaCreacion.getDate()) : event.fechaCreacion.getDate()}`;
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
        fechaInicio: new Date(req.body.fechaInicio), fechaFin: new Date(req.body.fechaFin), presencial,
        fechaCreacion: new Date(), idUser: req.cookies.user.id, idCategory: parseInt(req.body.categoria)};
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
    
        event.fechaInicio = `${event.fechaInicio.getFullYear()}-${(event.fechaInicio.getMonth()+1) < 10 ? '0'+(event.fechaInicio.getMonth()+1) : (event.fechaInicio.getMonth()+1) }-${(event.fechaInicio.getDate()) < 10 ? '0'+(event.fechaInicio.getDate()) : event.fechaInicio.getDate()}`;
        event.fechaFin = `${event.fechaFin.getFullYear()}-${(event.fechaFin.getMonth()+1) < 10 ? '0'+(event.fechaFin.getMonth()+1) : (event.fechaFin.getMonth()+1) }-${(event.fechaFin.getDate()) < 10 ? '0'+(event.fechaFin.getDate()) : event.fechaFin.getDate()}`;
        event.fechaCreacion = `${event.fechaCreacion.getFullYear()}-${(event.fechaCreacion.getMonth()+1) < 10 ? '0'+(event.fechaCreacion.getMonth()+1) : (event.fechaCreacion.getMonth()+1) }-${(event.fechaCreacion.getDate()) < 10 ? '0'+(event.fechaCreacion.getDate()) : event.fechaCreacion.getDate()}`;
    
        res.render("events/detail",{event:event, categories: categories, minDate: minDate});
    } else {
        res.redirect("/");
    }
});

router.post("/:id", async(req,res) => {
    if(req.cookies.user) {
        const presencial = req.body.presencial === 1 ? true :  false;
        const newEvent = {nombre:req.body.nombre, lugar: req.body.lugar, direccion: req.body.direccion, 
        fechaInicio: new Date(req.body.fechaInicio), fechaFin: new Date(req.body.fechaFin), presencial, 
        idUser: req.cookies.user.id, idCategory: parseInt(req.body.categoria), id: req.params.id};
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