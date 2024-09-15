const express = require('express');
const router = express.Router();
const {
    createComment,
    editComment,
    deleteComment
} = require('../controllers/commentController');

router.post('/listings/:listingId/comments', createComment);
router.patch('/listings/:listingId/comments', editComment);
router.delete('/listings/:listingId/comments', deleteComment);

module.exports = router;