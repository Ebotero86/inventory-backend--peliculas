const { Schema, model} = require('mongoose');

const TipoSchema = Schema ({
   name: {type: String, require: true},
   createdAt: { type: Date, require: true},
   updatedAt: { type: String, require: true},
   description: { type: String, require: true},

})

module.exports = model ('Tipo', TipoSchema);