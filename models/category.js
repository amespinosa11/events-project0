const db = require("../server/config");

module.exports = {

    getCategory : async(id) => {
        const category = await db('category').where({
            id: id
          });
        return category;
    }

}