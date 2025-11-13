const Game = require('../models/Game');
const Review = require('../models/Review');

// Obtener todos los juegos
exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.find().sort({ fechaCreacion: -1 });
    res.json(games);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener juegos', error: error.message });
  }
};

// Obtener un juego por ID
exports.getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ mensaje: 'Juego no encontrado' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el juego', error: error.message });
  }
};

// Crear un nuevo juego
exports.createGame = async (req, res) => {
  try {
    const nuevoJuego = new Game(req.body);
    const juegoGuardado = await nuevoJuego.save();
    res.status(201).json(juegoGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el juego', error: error.message });
  }
};

// Actualizar un juego
exports.updateGame = async (req, res) => {
  try {
    const juegoActualizado = await Game.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!juegoActualizado) {
      return res.status(404).json({ mensaje: 'Juego no encontrado' });
    }
    res.json(juegoActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el juego', error: error.message });
  }
};

// Eliminar un juego Y sus reseñas asociadas
exports.deleteGame = async (req, res) => {
  try {
    const juegoEliminado = await Game.findByIdAndDelete(req.params.id);
    if (!juegoEliminado) {
      return res.status(404).json({ mensaje: 'Juego no encontrado' });
    }

    // NUEVO: Eliminar todas las reseñas asociadas a este juego
    const reseñasEliminadas = await Review.deleteMany({ juegoId: req.params.id });
    
    res.json({ 
      mensaje: 'Juego eliminado correctamente',
      juegoEliminado: juegoEliminado,
      reseñasEliminadas: reseñasEliminadas.deletedCount
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el juego', error: error.message });
  }
};