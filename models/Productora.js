const { Schema, model } = require ('mongoose');

const ProductoraSchema = Schema({
   name: { type: String, require: true},
   state: { type: String, enum:['Activo', 'Inactivo'], require: true},
   createdAt: { type: Date, require: true},
   updatedAt: { type: String, require: true},
   slogan: { type: String, required: false }, 
   description: { type: String, require: true},
});

module.exports = model ('Genero', ProductoraSchema);