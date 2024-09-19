const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    // listingId: { 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     required: true 
    // },
    text: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    // seller_id: {
    //     type: String,
    //     required: true
    // },
    // item_id: {
    //     type: String,
    //     required: true
    // },
    // role: {
    //     type: String,
    //     enum: ['seller', 'buyer'],
    //     required: true
    // }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
