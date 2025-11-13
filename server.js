// Importar dependencias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Importar rutas (las crearemos después)
const gameRoutes = require('./routes/games');
const reviewRoutes = require('./routes/reviews');

// Crear aplicación Express
const app = express();

// Middlewares (configuraciones)
app.use(cors()); // Permitir peticiones del frontend
app.use(express.json()); // Leer JSON en las peticiones

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((error) => console.log('❌ Error al conectar:', error));

// Rutas
app.use('/api/games', gameRoutes);
app.use('/api/reviews', reviewRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: '🎮 Bienvenido a GameTracker API' });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});