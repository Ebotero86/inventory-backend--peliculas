const { Schema, model } = require ('mongoose');

const ProductoraSchema = Schema({
   name: { type: String, require: true},
   state: { type: String, enum:['Activo', 'Inactivo'], require: true},
   createdAt: { type: Date, required: true },
   updatedAt: { type: Date, required: true },
   slogan: { type: String, required: false }, 
   description: { type: String, require: true},
});

module.exports = model ('productora', ProductoraSchema);