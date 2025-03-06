 const { Schema, model} = require('mongoose');

 const DirectorSchema = Schema ({
    name: {type: String, require: true},
    state: {type: String, require: true, enum: ['Activo', 'Inactivo']},
    createdAt: { type: Date, require: true},
    updatedAt: { type: String, require: true},

 })

 module.exports = model ('director', DirectorSchema);