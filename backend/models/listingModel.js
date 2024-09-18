const mongoose = require('mongoose')

const Schema = mongoose.Schema

const listingSchema = new Schema ({
    listing_title: {
        type: String,
        require: true
    },
    user_id: {
        type: String,
        require: true
    },
    listing_img: {
        type: String,
        default: null,
        // require: true
    },
    shoe_brand: {
        type: String,
        require: true
    },
    shoe_size: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    condition: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },

    comments: [
        {
            type: Schema. Types. ObjectId,
            ref:'Comment'
        },
    ]
    
}, {timestamps: true});

module.exports = mongoose.model('Listing', listingSchema)