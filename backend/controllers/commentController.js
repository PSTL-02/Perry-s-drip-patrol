const Comment = require('../models/commentModel');
const Listing = require('../models/listingModel');

// CREATE COMMENT
const createComment = async (req, res) => {
    const {listingId} = req.params

    try {
        const listing = await Listing.findById(listingId)
        if (!listing) {
            return res.status(404).json({error: 'Listing not found'});
        }
        const newComment = new Comment({
            text: req.body.text,
            user_id: req.body.user_id
        });
        await newComment.save();
        listing.comments.push(newComment);
        await listing.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({error: 'Server error'});
    }
}

// EDIT COMMENT
const editComment = async (req, res) => {
    const {listingId, commentId} = req.params

    try {
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({error: 'Listing not found'});
        }
        const comment = await Comment.findByIdAndUpdate(
            commentId,
            {
                text: req.body.text
            },
            {new: true}
        )
        if (!comment) {
            return res.status(404).json({error: 'Comment not found'});
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({error: 'Server error'});
    }
}

// DELETE COMMENT
const deleteComment = async (req, res) => {
    const {listingId, commentId} = req.params
    
    try {
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({error: 'Listing not found'});
        }
        const comment = await Comment.findByIdAndDelete(commentId);
        if (!comment) {
            return res.status(404).json({error: 'Comment not found'});
        }
        listing.comments = listing.comments.filter (
            (comment) => comment.toString() !== commentId
        );
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({error: 'Server error'});
    }
}

module.exports = {createComment, editComment, deleteComment}