const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    listing_title: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    listing_img: {
        type: String,
        default: null,
    },
    gender_category: {
        type: String,
        required: true
    },
    shoe_brand: {
        type: String,
        require: true
    },
    shoe_size: {
        type: String,
        required: true
    },
    country_size: {
        type: String,
        require: true
    },
    price: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        },
    ]
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);
