const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true},   
   password: { type: String, required: true }, 
   role: { type: String, required: true, enum: ['Administrador', 'Docente'] },
   state: { type: String, required: true, enum: ['Activo', 'Inactivo'] },
   createdAt: { type: Date, required: true },
   updatedAt: { type: Date, required: true }
});

module.exports = model('Usuario', UsuarioSchema);
