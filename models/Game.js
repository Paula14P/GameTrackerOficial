const mongoose = require('mongoose');

// Definir el esquema (estructura) de un videojuego
const gameSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,  // Obligatorio
    trim: true       // Elimina espacios al inicio y final
  },
  genero: {
    type: String,
    required: true
  },
  plataforma: {
    type: String,
    required: true
  },
  añoLanzamiento: {
    type: Number,
    required: true
  },
  desarrollador: {
    type: String,
    required: true
  },
  imagenPortada: {
    type: String,
    default: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=400&fit=crop'
  },
  descripcion: {
    type: String,
    default: ''
  },
  completado: {
    type: Boolean,
    default: false
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

// Crear y exportar el modelo
module.exports = mongoose.model('Game', gameSchema);