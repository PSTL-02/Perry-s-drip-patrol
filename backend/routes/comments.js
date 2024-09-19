const express = require('express');
const router = express.Router();
const {
    createComment,
    editComment,
    deleteComment,
    getCommentsForListing
} = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/listings/:listingId', getCommentsForListing);
router.post('/listings/:listingId/comments', authMiddleware, createComment);
router.patch('/listings/:listingId/comments/:commentId', authMiddleware, editComment);
router.delete('/listings/:listingId/comments/:commentId', authMiddleware, deleteComment);

module.exports = router;
