const db = require("../server/config");

module.exports = {

    getEvents: async(idUsuario) => {
        const events = await db('event').where({
            iduser: idUsuario
          }).orderBy([{ column: 'fechaCreacion', order: 'desc' }])
        return events;
    },

    getEvent : async(id) => {
        const event = await db('event').where({
            id: id
          });
        return event;
    },
    
    createEvent: async(event) => {
        const user = await db('event').insert(event);
        return user;
    },

    editEvent: async(event) => {
        const event2 = await db('event')
        .where({ id: event.id })
        .update({
          nombre: event.nombre,
          lugar: event.lugar,
          direccion: event.direccion,
          fechainicio: event.fechainicio,
          fechafin: event.fechafin,
          idcategory: event.idcategory,
          presencial: event.presencial
        });
        return event2;
    },

    deleteEvent: async(id) => {
        const event = await db('event')
        .where({id:id})
        .del();
        return event;
    }

}