const mongoose = require('mongoose')

const Schema = mongoose.Schema

const listingSchema = new Schema ({
    listing_title: {
        type: String,
        require: true
    },
    owner_name: {
        type: String,
        require: true
    },
    listing_img: {
        type: String,
        require: true
    },
    shoe_size: {
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