const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Rutas para reseñas
router.get('/', reviewController.getAllReviews);                    // GET /api/reviews
router.get('/game/:juegoId', reviewController.getReviewsByGame);    // GET /api/reviews/game/:juegoId
router.get('/:id', reviewController.getReviewById);                 // GET /api/reviews/:id
router.post('/', reviewController.createReview);                    // POST /api/reviews
router.put('/:id', reviewController.updateReview);                  // PUT /api/reviews/:id
router.delete('/:id', reviewController.deleteReview);               // DELETE /api/reviews/:id

module.exports = router;