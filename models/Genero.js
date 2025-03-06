 const { Schema, model }= require('mongoose');

 const GeneroSchema = Schema({
    name: { type: String, require: true},
    state: { type: String, enum:['Activo', 'Inactivo'], require: true},
    createAt: { type: Date, require: true},
    updateAt: { type: String, require: true},
    description: { type: String, require: true},
    
 });

 module.exports = model ('genero', GeneroSchema);