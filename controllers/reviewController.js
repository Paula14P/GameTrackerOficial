const Review = require('../models/Review');

// Obtener todas las reseñas
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('juegoId', 'titulo imagenPortada');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener reseñas', error: error.message });
  }
};

// Obtener reseñas de un juego específico
exports.getReviewsByGame = async (req, res) => {
  try {
    const reviews = await Review.find({ juegoId: req.params.juegoId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener reseñas', error: error.message });
  }
};

// Obtener una reseña por ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('juegoId');
    if (!review) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la reseña', error: error.message });
  }
};

// Crear una nueva reseña
exports.createReview = async (req, res) => {
  try {
    const nuevaReseña = new Review(req.body);
    const reseñaGuardada = await nuevaReseña.save();
    res.status(201).json(reseñaGuardada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear la reseña', error: error.message });
  }
};

// Actualizar una reseña
exports.updateReview = async (req, res) => {
  try {
    req.body.fechaActualizacion = Date.now();
    const reseñaActualizada = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!reseñaActualizada) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }
    res.json(reseñaActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar la reseña', error: error.message });
  }
};

// Eliminar una reseña
exports.deleteReview = async (req, res) => {
  try {
    const reseñaEliminada = await Review.findByIdAndDelete(req.params.id);
    if (!reseñaEliminada) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }
    res.json({ mensaje: 'Reseña eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la reseña', error: error.message });
  }
};