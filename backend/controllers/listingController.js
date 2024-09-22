const Listing = require('../models/listingModel')

const mongoose = require('mongoose')

// Get Listing/s
const getListings = async(req, res) => {
    try {
        const listings = await Listing.find({}).populate({
            path: 'comments',
            model: 'Comment'
        }).sort({ createdAt: -1});

        res.status(200).json(listings);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'})
    }
};

// Get single Listing
const getListing = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Such Listing: Id Invalid'})
    }

    try {
        // const listing = await Listing.findById(id).populate('comments');
        const listing = await Listing.findById(id).populate({
            path: 'comments',
            model: 'Comment'
        });
        
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        res.status(200).json(listing);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create Listing
const createListing = async (req, res) => {
    const { listing_title, shoe_size, shoe_brand, country_size, price, location, condition, description, user_id } = req.body

    const imageFilename = req.file ? req.file.filename : null;

    try {
        const listing = await Listing.create({
            listing_title,
            listing_img: imageFilename,
            shoe_size,
            shoe_brand,
            country_size,
            price,
            location,
            condition,
            description,
            user_id,
        })

        res.status(200).json(listing)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

// Delete Listing
const deleteListing = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Such Listing'})
    }

    const listing = await Listing.findOneAndDelete({_id: id})

    if(!listing) {
        return res.status(404).json({error: 'No such Listing'})
    }

    res.status(200).json(listing)
}

// Update a Listing
const updateListing = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Such Listing'})
    }

    const listing = await Listing.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!listing) {
        return res.status(404).json({error: 'No such Listing'})
    }

    res.status(200).json(listing)
}

module.exports = {
    getListings,
    getListing,
    createListing,
    deleteListing,
    updateListing
}