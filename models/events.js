const db = require("../server/config");

module.exports = {

    getEvents: async(idUsuario) => {
        const events = await db('event').where({
            idUser: idUsuario
          });
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
          fechaInicio: event.fechaInicio,
          fechaFin: event.fechaFin,
          idCategory: event.idCategory
        });
        return event2;
    },

    deleteEvent: async(id) => {
        const event = await knex('event')
        .where({id:id})
        .del();
        return event;
    }

}