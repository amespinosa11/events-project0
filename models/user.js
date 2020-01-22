const db = require("../server/config");

module.exports = {
    getUser : async(email, contrasena) => {
        const user = await db('user').where({
            email: email,
            contrasena: contrasena
          }).select('*')
        return user;
    },
    
    createUser: async(user) => {
        const user2 = await db('user').insert(user);
        return user2;
    }
}