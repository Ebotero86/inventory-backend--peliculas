const { Schema, model } = require('mongoose');

const MediaSchema = new Schema({
   serial: { type: String, required: true, unique: true }, 
   titulo: { type: String, required: true },  
   sinopsis: { type: String, required: true }, 
   url: { type: String, required: true, unique: true },
   imagen: { type: String, required: true }, 
   createdAt: { type: Date, require: true },  
   updatedAt: { type: Date, require: true },
   anoEstreno: { type: Number, required: true },  
   generoPrincipal: { type: String, required: true },  
   directorPrincipal: { type: String, required: true },  
   productora: { type: String, required: true },  
   tipo: { type: String, required: true },  
});

module.exports = model('Media', MediaSchema);
