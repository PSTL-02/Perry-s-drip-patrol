const express = require('express')
const router = express.Router()
const {
    createComment,
    editComment,
    deleteComment
} = require('../controllers/commentController')

// Create a new comment for a specific workout
router.post(`/listings/:listingId/comments`, createComment)

// Edit existing comment:
router.patch(`/listings/:listingId/comments`, editComment)

// Delete existing comment:
router.delete(`/listings/:listingId/comments`, deleteComment)

module.exports = router;