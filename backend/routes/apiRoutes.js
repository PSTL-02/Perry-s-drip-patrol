// routes/apiRoutes.js

const express = require('express');
const router = express.Router();

// Import your controller functions
const commentsController = require('../controllers/commentsController');

// Define the route to get comments
router.get('/listings/:id/comments', commentsController.getComments);

router.get('/listings/:id/comments', (req, res, next) => {
    console.log('Request received for listingId:', req.params.id);
    next();
  }, commentsController.getComments);
  
module.exports = router;
