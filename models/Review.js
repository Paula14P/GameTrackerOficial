const mongoose = require('mongoose');

// Definir el esquema de una reseña
const reviewSchema = new mongoose.Schema({
  juegoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',  // Referencia al modelo Game
    required: true
  },
  puntuacion: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  textoReseña: {
    type: String,
    required: true
  },
  horasJugadas: {
    type: Number,
    default: 0
  },
  dificultad: {
    type: String,
    enum: ['Fácil', 'Normal', 'Difícil'],  // Solo acepta estos valores
    default: 'Normal'
  },
  recomendaria: {
    type: Boolean,
    default: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  }
});

// Crear y exportar el modelo
module.exports = mongoose.model('Review', reviewSchema);