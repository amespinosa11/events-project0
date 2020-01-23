const db = require("../server/config");

module.exports = {

    getCategory : async(id) => {
        const category = await db('category').where({
            id: id
          });
        return category;
    },

    getCategories: async() => {
        const categories = await db.select('id', 'nombre').from('category');
        return categories;
    }

}